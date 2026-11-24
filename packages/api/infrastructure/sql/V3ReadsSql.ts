import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { V3Reads, type AskedPage } from '../../application/V3Reads';
import type {
  TargetingContext,
  RestrictedContext,
  Contributor,
  Notice,
  PinnedNotice,
} from '../../application/ReadModels';
import {
  completeExcludeUrlRegex,
  fullUrlRegex,
  type DomainName,
} from '../../domain/UrlPattern';
import type { Visibility } from '../../domain/NoticeVisibility';
import { DatabaseLive } from './Database';

// The PHP backend let Doctrine load lazily: serving the 178 contributors
// there triggered thousands of queries. Here each endpoint fits in a handful
// of grouped queries, assembled in memory — 211 contributors and 2,340
// notices lend themselves to that.
const JOURS_ABONNEMENT_ACTIF = 7;

interface LigneNotice {
  readonly id: number;
  readonly visibility: string;
  readonly message: string;
  readonly locale: string | null;
  readonly screenshot: string | null;
  readonly created: string;
  readonly updated: string;
  readonly expires: string | null;
  readonly unpublished_on_expiration: number;
  readonly liked_count: number;
  readonly disliked_count: number;
  readonly contributor_id: number | null;
}

interface LigneContributeur {
  readonly id: number;
  readonly name: string;
  readonly title: string | null;
  readonly website: string | null;
  readonly intro: string | null;
  readonly image: string | null;
  readonly banner_image: string | null;
  readonly preview_image: string | null;
  readonly locale: string | null;
  readonly categories: string | null;
}

// Doctrine stores a simple_array as comma-separated values, and an empty
// column gives [''] when split naively — that is, a nameless category in the
// payload.
const simpleArray = (valeur: string | null): ReadonlyArray<string> =>
  valeur === null || valeur === '' ? [] : valeur.split(',');

// The same shape comes out of both queries, direct domains and domains from
// a shared set, whose lists are concatenated afterwards.
interface LigneDeDomaine {
  readonly matching_context_id: number;
  readonly name: string;
  readonly path: string | null;
  readonly aliases: string | null;
}

// Each costs a table scan: read once per call, then passed along.
interface Annexes {
  readonly exemples: ReadonlyMap<number, string>;
  readonly relayers: ReadonlyMap<number, ReadonlyArray<number>>;
}

const versNotice = (ligne: LigneNotice, annexes: Annexes): Notice => ({
  id: ligne.id,
  visibility: ligne.visibility as Visibility,
  message: ligne.message,
  locale: ligne.locale,
  screenshot: ligne.screenshot,
  created: ligne.created,
  updated: ligne.updated,
  expires: ligne.expires,
  // MySQL returns Doctrine's `tinyint(1)` as 0 or 1.
  unpublishedOnExpiration: ligne.unpublished_on_expiration === 1,
  likedCount: ligne.liked_count,
  dislikedCount: ligne.disliked_count,
  contributorId: ligne.contributor_id,
  relayerIds: annexes.relayers.get(ligne.id) ?? [],
  exampleMatchingUrl: annexes.exemples.get(ligne.id) ?? null,
});

const grouper = <C, V>(
  lignes: ReadonlyArray<C>,
  cle: (ligne: C) => number,
  valeur: (ligne: C) => V,
): Map<number, V[]> => {
  const groupes = new Map<number, V[]>();
  for (const ligne of lignes) {
    const k = cle(ligne);
    const existant = groupes.get(k);
    if (existant === undefined) groupes.set(k, [valeur(ligne)]);
    else existant.push(valeur(ligne));
  }
  return groupes;
};

export const V3ReadsSqlLive = Layer.effect(
  V3Reads,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    // The rule of domain/NoticeVisibility.ts in SQL, defined once and
    // interpolated everywhere so that it cannot drift between endpoints.
    const isServed = sql.literal(`
      c.enabled = 1
      AND n.visibility = 'public'
      AND (n.expires >= NOW()
           OR n.expires IS NULL
           OR (n.expires <= NOW() AND n.unpublished_on_expiration = 0))
    `);

    // Notice::getLocale() is not the column: a notice inherits the language
    // of its contributor when its own is null, which holds for 2,028 of the
    // public notices — only 9 carry a language of their own. The last-resort
    // fallback of the PHP, Locale::getDefault(), is never reached.
    const champsNotice = sql.literal(`
      n.id, n.visibility, n.message, COALESCE(n.locale, c.locale) AS locale,
      n.screenshot, n.created, n.updated, n.expires,
      n.unpublished_on_expiration,
      n.liked_count, n.disliked_count, n.contributor_id
    `);

    // Notice::getExampleMatchingUrl() takes the first of the array, and
    // Doctrine does not order that collection: the primary key decides.
    const exemplesParNotice = Effect.gen(function* () {
      // The inherited schema mixes conventions: `notice_id` in snake case,
      // `exampleUrl` in camel case. The names are therefore written out
      // rather than transformed by a driver rule.
      const lignes = yield* sql<{ notice_id: number; example_url: string }>`
        SELECT mc.notice_id, mc.exampleUrl AS example_url
          FROM matching_context mc
         WHERE mc.exampleUrl IS NOT NULL AND mc.exampleUrl <> ''
         ORDER BY mc.id
      `;

      const premiers = new Map<number, string>();
      for (const ligne of lignes) {
        if (!premiers.has(ligne.notice_id)) {
          premiers.set(ligne.notice_id, ligne.example_url);
        }
      }
      return premiers;
    });

    const relayeursParNotice = Effect.gen(function* () {
      const lignes = yield* sql<{ notice_id: number; relayed_by_id: number }>`
        SELECT r.notice_id, r.relayed_by_id
          FROM relay r
         ORDER BY r.relayed_by_id
      `;
      return grouper(
        lignes,
        (ligne) => ligne.notice_id,
        (ligne) => ligne.relayed_by_id,
      );
    });

    // These scan matching_context and relay whole. Leaving them as Effects
    // and composing them inside each inner function reran them for every
    // contributor: GET /contributors triggered 356 full scans instead of
    // two.
    const lireLesAnnexes = Effect.all({
      exemples: exemplesParNotice,
      relayers: relayeursParNotice,
    });

    // Contributor::getPublicNotices() looks only at visibility, never at
    // expiry: for 6 of the 178 served contributors, an expiry filter would
    // change the announced contribution count.
    //
    // Breaking ties by identifier does not exist in the PHP, which asked for
    // ORDER BY updated ASC with no second criterion: MySQL then returns the
    // ties in the physical order of the rows, and production returns 260, 262
    // where the restored database returns 262, 260. No query bridges that
    // gap. A deterministic order is chosen instead, and the differential test
    // compares those groups up to permutation: it is the one thing in V3 that
    // is not reproducible byte for byte.
    const noticesPubliquesDe = (contributeurId: number, annexes: Annexes) =>
      Effect.gen(function* () {
        const lignes = yield* sql<LigneNotice>`
          SELECT ${champsNotice}
            FROM notice n
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE n.visibility = 'public'
             AND n.contributor_id = ${contributeurId}
           ORDER BY n.updated ASC, n.id ASC
        `;

        return lignes.map((ligne) => versNotice(ligne, annexes));
      });

    const epingleesDe = (contributeurId: number, annexes: Annexes) =>
      Effect.gen(function* () {
        const lignes = yield* sql<LigneNotice & { sort: number }>`
          SELECT ${champsNotice}, p.sort
            FROM pin p
            JOIN notice n ON n.id = p.notice_id
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE p.contributor_id = ${contributeurId}
           ORDER BY p.sort ASC
        `;

        return lignes.map(
          (ligne): PinnedNotice => ({
            ...versNotice(ligne, annexes),
            pinnedSort: ligne.sort,
          }),
        );
      });

    // No visibility filter: the presentation filters, keeping the indices,
    // because the gaps in the numbering show in the payload.
    // Contributor::$relayedNotices carries no explicit order: it is the one
    // of the relay primary key.
    const relayeesDe = (contributeurId: number, annexes: Annexes) =>
      Effect.gen(function* () {
        const lignes = yield* sql<LigneNotice>`
          SELECT ${champsNotice}
            FROM relay r
            JOIN notice n ON n.id = r.notice_id
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE r.relayed_by_id = ${contributeurId}
           ORDER BY r.notice_id ASC
        `;

        return lignes.map((ligne) => versNotice(ligne, annexes));
      });

    const contributeursDepuis = Effect.fn('V3Reads.contributors')(
      function* (restriction: {
        readonly id?: number;
        readonly annexes: Annexes;
      }) {
        const filtre =
          restriction.id === undefined
            ? sql.literal(`
                EXISTS (SELECT 1 FROM notice n
                         WHERE n.contributor_id = c.id
                           AND n.visibility = 'public')
              `)
            : sql`c.id = ${restriction.id}`;

        const [lignes, abonnements] = yield* Effect.all([
          sql<LigneContributeur>`
            SELECT c.id, c.name, c.title, c.website, c.intro, c.image,
                   c.banner_image, c.preview_image, c.locale, c.categories
              FROM contributor c
             WHERE c.enabled = 1 AND ${filtre}
          `,
          sql<{ contributor_id: number; actifs: number }>`
            SELECT s.contributor_id, COUNT(s.extension_id) AS actifs
              FROM subscription s
             WHERE s.created >= DATE_SUB(NOW(), INTERVAL ${JOURS_ABONNEMENT_ACTIF} DAY)
                OR s.updated >= DATE_SUB(NOW(), INTERVAL ${JOURS_ABONNEMENT_ACTIF} DAY)
             GROUP BY s.contributor_id
          `,
        ]);

        const actifsPar = new Map(
          abonnements.map((ligne) => [ligne.contributor_id, ligne.actifs]),
        );

        return yield* Effect.forEach(
          lignes,
          (ligne) =>
            Effect.gen(function* () {
              const [publiques, epinglees, relayees] = yield* Effect.all([
                noticesPubliquesDe(ligne.id, restriction.annexes),
                epingleesDe(ligne.id, restriction.annexes),
                relayeesDe(ligne.id, restriction.annexes),
              ]);

              return {
                id: ligne.id,
                name: ligne.name,
                title: ligne.title,
                website: ligne.website,
                intro: ligne.intro,
                image: ligne.image,
                bannerImage: ligne.banner_image,
                previewImage: ligne.preview_image,
                locale: ligne.locale,
                categories: simpleArray(ligne.categories),
                subscribersActiveInTheLastSevenDays:
                  actifsPar.get(ligne.id) ?? 0,
                publicNotices: publiques,
                pinnedNotices: epinglees,
                relays: relayees,
              } satisfies Contributor;
            }),
          { concurrency: 8 },
        );
      },
    );

    return V3Reads.of({
      contributors: Effect.gen(function* () {
        const annexes = yield* lireLesAnnexes;
        return yield* contributeursDepuis({ annexes });
      }).pipe(Effect.orDie),

      contributor: Effect.fn('V3Reads.contributor')(function* (id: number) {
        const annexes = yield* lireLesAnnexes;
        const trouves = yield* contributeursDepuis({ id, annexes });
        return trouves[0] ?? null;
      }, Effect.orDie),

      notices: Effect.fn('V3Reads.notices')(function* (asked: AskedPage) {
        const parContributeur =
          asked.contributorId === undefined
            ? sql.literal('1 = 1')
            : sql`n.contributor_id = ${asked.contributorId}`;

        const [lignes, total, annexes] = yield* Effect.all([
          sql<LigneNotice>`
            SELECT ${champsNotice}
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND ${parContributeur}
             ORDER BY n.created DESC, n.id DESC
             LIMIT ${asked.limit} OFFSET ${asked.offset}
          `,
          sql<{ total: number }>`
            SELECT COUNT(*) AS total
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND ${parContributeur}
          `,
          lireLesAnnexes,
        ]);

        return {
          notices: lignes.map((ligne) => versNotice(ligne, annexes)),
          total: total[0]?.total ?? 0,
        };
      }, Effect.orDie),

      detailedNotice: Effect.fn('V3Reads.detailedNotice')(function* (
        id: number,
      ) {
        const [lignes, annexes] = yield* Effect.all([
          sql<LigneNotice>`
            SELECT ${champsNotice}
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND n.id = ${id}
          `,
          lireLesAnnexes,
        ]);

        const ligne = lignes[0];
        if (ligne === undefined) return null;

        const notice = versNotice(ligne, annexes);

        // Only the contributor and the relayers of this notice are
        // assembled. Loading the 178 contributors to keep three cost more
        // than five hundred queries per call.
        const voulus = [
          ...(notice.contributorId === null ? [] : [notice.contributorId]),
          ...notice.relayerIds,
        ];
        const charges = yield* Effect.forEach(
          voulus,
          (contributeurId) =>
            contributeursDepuis({ id: contributeurId, annexes }),
          { concurrency: 4 },
        );
        const parId = new Map(
          charges.flat().map((contributor) => [contributor.id, contributor]),
        );

        return {
          notice,
          contributor:
            notice.contributorId === null
              ? null
              : (parId.get(notice.contributorId) ?? null),
          relayers: notice.relayerIds.flatMap((relayeurId) => {
            const trouve = parId.get(relayeurId);
            return trouve === undefined ? [] : [trouve];
          }),
        };
      }, Effect.orDie),

      targetingContexts: Effect.fn('V3Reads.targetingContexts')(function* (
        contributors: ReadonlyArray<number> | null,
      ) {
        // A contributor also sees the contexts of the notices they relay:
        // the PHP repository joins `Relay` for that reason.
        const restriction =
          contributors === null || contributors.length === 0
            ? sql.literal('1 = 1')
            : sql`(c.id IN ${sql.in(contributors)} OR rc.id IN ${sql.in(contributors)})`;

        const [lignes, domaines, jeux] = yield* Effect.all([
          sql<{
            id: number;
            notice_id: number;
            url_regex: string;
            exclude_url_regex: string | null;
            query_selector: string | null;
            xpath: string | null;
            example_url: string | null;
            notice_exclude_url_regex: string | null;
          }>`
            SELECT DISTINCT
                   mc.id, mc.notice_id, mc.urlRegex AS url_regex,
                   mc.excludeUrlRegex AS exclude_url_regex,
                   mc.querySelector AS query_selector, mc.xpath,
                   mc.exampleUrl AS example_url,
                   n.excludeUrlRegex AS notice_exclude_url_regex
              FROM matching_context mc
              JOIN notice n ON n.id = mc.notice_id
              JOIN contributor c ON c.id = n.contributor_id
              LEFT JOIN relay r ON r.notice_id = n.id
              LEFT JOIN contributor rc ON rc.id = r.relayed_by_id
             WHERE ${isServed} AND ${restriction}
          `,
          sql<LigneDeDomaine>`
            SELECT mcdn.matching_context_id, dn.name, dn.path, dn.aliases
              FROM matching_context_domain_name mcdn
              JOIN domain_name dn ON dn.id = mcdn.domain_name_id
             ORDER BY dn.name ASC
          `,
          sql<LigneDeDomaine>`
            SELECT mcds.matching_context_id, dn.name, dn.path, dn.aliases
              FROM matching_context_domains_set mcds
              JOIN domains_set ds ON ds.id = mcds.domains_set_id
              JOIN domains_set_domain dsd ON dsd.domains_set_id = ds.id
              JOIN domain_name dn ON dn.id = dsd.domain_name_id
             ORDER BY ds.name ASC, dn.name ASC
          `,
        ]);

        const versDomaine = (ligne: LigneDeDomaine): DomainName => ({
          name: ligne.name,
          path: ligne.path,
          aliases: simpleArray(ligne.aliases),
        });

        const directsPar = grouper(
          domaines,
          (ligne) => ligne.matching_context_id,
          versDomaine,
        );
        const desJeuxPar = grouper(
          jeux,
          (ligne) => ligne.matching_context_id,
          versDomaine,
        );

        return lignes.map(
          (ligne): TargetingContext => ({
            id: ligne.id,
            noticeId: ligne.notice_id,
            urlRegex: fullUrlRegex(
              {
                // The order matters: `getAllRelatedDomains()` places the
                // domains of the sets before the direct domains.
                domainsSets: [{ domains: desJeuxPar.get(ligne.id) ?? [] }],
                domainNames: directsPar.get(ligne.id) ?? [],
              },
              ligne.url_regex,
            ),
            excludeUrlRegex: completeExcludeUrlRegex(
              ligne.exclude_url_regex,
              ligne.notice_exclude_url_regex,
            ),
            querySelector: ligne.query_selector,
            xpath: ligne.xpath,
            exampleUrl: ligne.example_url,
          }),
        );
      }, Effect.orDie),

      noticeWhateverItsVisibility: Effect.fn(
        'V3Reads.noticeWhateverItsVisibility',
      )(function* (id: number) {
        const [lignes, annexes] = yield* Effect.all([
          sql<LigneNotice>`
            SELECT ${champsNotice}
              FROM notice n
              LEFT JOIN contributor c ON c.id = n.contributor_id
             WHERE n.id = ${id}
          `,
          lireLesAnnexes,
        ]);

        const ligne = lignes[0];
        return ligne === undefined ? null : versNotice(ligne, annexes);
      }, Effect.orDie),

      restrictedContexts: Effect.gen(function* () {
        const lignes = yield* sql<{ id: number; urlRegex: string }>`
          SELECT rc.id, rc.urlRegex
            FROM restricted_context rc
        `;
        return lignes.map(
          (ligne): RestrictedContext => ({
            id: ligne.id,
            urlRegex: ligne.urlRegex,
          }),
        );
      }).pipe(Effect.orDie),
    });
  }),
);

// provideMerge rather than provide: the SqlClient stays visible for the
// admin and for the tests that check a value in the database, without opening
// a second connection pool.
export const V3Live = V3ReadsSqlLive.pipe(Layer.provideMerge(DatabaseLive));
