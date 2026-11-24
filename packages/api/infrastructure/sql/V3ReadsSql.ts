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
import { ACTIVE_SUBSCRIPTION_DAYS } from './activeSubscribers';
import { simpleArray } from './simpleArray';

// The PHP backend let Doctrine load lazily: serving the 178 contributors
// there triggered thousands of queries. Here each endpoint fits in a handful
// of grouped queries, assembled in memory — 211 contributors and 2,340
// notices lend themselves to that.

interface NoticeRow {
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

interface ContributorRow {
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

// The same shape comes out of both queries, direct domains and domains from
// a shared set, whose lists are concatenated afterwards.
interface DomainRow {
  readonly matching_context_id: number;
  readonly name: string;
  readonly path: string | null;
  readonly aliases: string | null;
}

// Each costs a table scan: read once per call, then passed along.
interface Lookups {
  readonly exampleUrls: ReadonlyMap<number, string>;
  readonly relayers: ReadonlyMap<number, ReadonlyArray<number>>;
}

const toNotice = (row: NoticeRow, lookups: Lookups): Notice => ({
  id: row.id,
  visibility: row.visibility as Visibility,
  message: row.message,
  locale: row.locale,
  screenshot: row.screenshot,
  created: row.created,
  updated: row.updated,
  expires: row.expires,
  // MySQL returns Doctrine's `tinyint(1)` as 0 or 1.
  unpublishedOnExpiration: row.unpublished_on_expiration === 1,
  likedCount: row.liked_count,
  dislikedCount: row.disliked_count,
  contributorId: row.contributor_id,
  relayerIds: lookups.relayers.get(row.id) ?? [],
  exampleMatchingUrl: lookups.exampleUrls.get(row.id) ?? null,
});

const groupBy = <R, V>(
  rows: ReadonlyArray<R>,
  key: (row: R) => number,
  value: (row: R) => V,
): Map<number, V[]> => {
  const groups = new Map<number, V[]>();
  for (const row of rows) {
    const k = key(row);
    const existing = groups.get(k);
    if (existing === undefined) groups.set(k, [value(row)]);
    else existing.push(value(row));
  }
  return groups;
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
    const noticeFields = sql.literal(`
      n.id, n.visibility, n.message, COALESCE(n.locale, c.locale) AS locale,
      n.screenshot, n.created, n.updated, n.expires,
      n.unpublished_on_expiration,
      n.liked_count, n.disliked_count, n.contributor_id
    `);

    // Notice::getExampleMatchingUrl() takes the first of the array, and
    // Doctrine does not order that collection: the primary key decides.
    //
    // The inherited schema mixes conventions: `notice_id` in snake case,
    // `exampleUrl` in camel case. The names are therefore written out rather
    // than transformed by a driver rule.
    const exampleUrlByNotice = Effect.gen(function* () {
      const rows = yield* sql<{ notice_id: number; example_url: string }>`
        SELECT mc.notice_id, mc.exampleUrl AS example_url
          FROM matching_context mc
         WHERE mc.exampleUrl IS NOT NULL AND mc.exampleUrl <> ''
         ORDER BY mc.id
      `;

      const first = new Map<number, string>();
      for (const row of rows) {
        if (!first.has(row.notice_id)) {
          first.set(row.notice_id, row.example_url);
        }
      }
      return first;
    });

    const relayersByNotice = Effect.gen(function* () {
      const rows = yield* sql<{ notice_id: number; relayed_by_id: number }>`
        SELECT r.notice_id, r.relayed_by_id
          FROM relay r
         ORDER BY r.relayed_by_id
      `;

      return groupBy(
        rows,
        (row) => row.notice_id,
        (row) => row.relayed_by_id,
      );
    });

    // These scan matching_context and relay whole. Leaving them as Effects
    // and composing them inside each inner function reran them for every
    // contributor: GET /contributors triggered 356 full scans instead of
    // two.
    const readLookups = Effect.all({
      exampleUrls: exampleUrlByNotice,
      relayers: relayersByNotice,
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
    const publicNoticesOf = (contributorId: number, lookups: Lookups) =>
      Effect.map(
        sql<NoticeRow>`
          SELECT ${noticeFields}
            FROM notice n
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE n.visibility = 'public'
             AND n.contributor_id = ${contributorId}
           ORDER BY n.updated ASC, n.id ASC
        `,
        (rows) => rows.map((row) => toNotice(row, lookups)),
      );

    const pinnedNoticesOf = (contributorId: number, lookups: Lookups) =>
      Effect.map(
        sql<NoticeRow & { sort: number }>`
          SELECT ${noticeFields}, p.sort
            FROM pin p
            JOIN notice n ON n.id = p.notice_id
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE p.contributor_id = ${contributorId}
           ORDER BY p.sort ASC
        `,
        (rows) =>
          rows.map(
            (row): PinnedNotice => ({
              ...toNotice(row, lookups),
              pinnedSort: row.sort,
            }),
          ),
      );

    // No visibility filter: the presentation filters, keeping the indices,
    // because the gaps in the numbering show in the payload.
    // Contributor::$relayedNotices carries no explicit order: it is the one
    // of the relay primary key.
    const relayedNoticesOf = (contributorId: number, lookups: Lookups) =>
      Effect.map(
        sql<NoticeRow>`
          SELECT ${noticeFields}
            FROM relay r
            JOIN notice n ON n.id = r.notice_id
            LEFT JOIN contributor c ON c.id = n.contributor_id
           WHERE r.relayed_by_id = ${contributorId}
           ORDER BY r.notice_id ASC
        `,
        (rows) => rows.map((row) => toNotice(row, lookups)),
      );

    const contributorsMatching = Effect.fn('V3Reads.contributors')(
      function* (restriction: {
        readonly id?: number;
        readonly lookups: Lookups;
      }) {
        const condition =
          restriction.id === undefined
            ? sql.literal(`
                EXISTS (SELECT 1 FROM notice n
                         WHERE n.contributor_id = c.id
                           AND n.visibility = 'public')
              `)
            : sql`c.id = ${restriction.id}`;

        const [rows, subscriptions] = yield* Effect.all([
          sql<ContributorRow>`
            SELECT c.id, c.name, c.title, c.website, c.intro, c.image,
                   c.banner_image, c.preview_image, c.locale, c.categories
              FROM contributor c
             WHERE c.enabled = 1 AND ${condition}
          `,
          sql<{ contributor_id: number; active: number }>`
            SELECT s.contributor_id, COUNT(s.extension_id) AS active
              FROM subscription s
             WHERE s.created >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
                OR s.updated >= DATE_SUB(NOW(), INTERVAL ${ACTIVE_SUBSCRIPTION_DAYS} DAY)
             GROUP BY s.contributor_id
          `,
        ]);

        const activeByContributor = new Map(
          subscriptions.map((row) => [row.contributor_id, row.active]),
        );

        return yield* Effect.forEach(
          rows,
          (row) =>
            Effect.gen(function* () {
              const [publicNotices, pinned, relayed] = yield* Effect.all([
                publicNoticesOf(row.id, restriction.lookups),
                pinnedNoticesOf(row.id, restriction.lookups),
                relayedNoticesOf(row.id, restriction.lookups),
              ]);

              return {
                id: row.id,
                name: row.name,
                title: row.title,
                website: row.website,
                intro: row.intro,
                image: row.image,
                bannerImage: row.banner_image,
                previewImage: row.preview_image,
                locale: row.locale,
                categories: simpleArray(row.categories),
                subscribersActiveInTheLastSevenDays:
                  activeByContributor.get(row.id) ?? 0,
                publicNotices,
                pinnedNotices: pinned,
                relays: relayed,
              } satisfies Contributor;
            }),
          { concurrency: 8 },
        );
      },
    );

    return V3Reads.of({
      contributors: Effect.gen(function* () {
        const lookups = yield* readLookups;
        return yield* contributorsMatching({ lookups });
      }).pipe(Effect.orDie),

      contributor: Effect.fn('V3Reads.contributor')(function* (id: number) {
        const lookups = yield* readLookups;
        const found = yield* contributorsMatching({ id, lookups });
        return found[0] ?? null;
      }, Effect.orDie),

      notices: Effect.fn('V3Reads.notices')(function* (asked: AskedPage) {
        const byContributor =
          asked.contributorId === undefined
            ? sql.literal('1 = 1')
            : sql`n.contributor_id = ${asked.contributorId}`;

        const [rows, total, lookups] = yield* Effect.all([
          sql<NoticeRow>`
            SELECT ${noticeFields}
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND ${byContributor}
             ORDER BY n.created DESC, n.id DESC
             LIMIT ${asked.limit} OFFSET ${asked.offset}
          `,
          sql<{ total: number }>`
            SELECT COUNT(*) AS total
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND ${byContributor}
          `,
          readLookups,
        ]);

        return {
          notices: rows.map((row) => toNotice(row, lookups)),
          total: total[0]?.total ?? 0,
        };
      }, Effect.orDie),

      detailedNotice: Effect.fn('V3Reads.detailedNotice')(function* (
        id: number,
      ) {
        const [rows, lookups] = yield* Effect.all([
          sql<NoticeRow>`
            SELECT ${noticeFields}
              FROM notice n
              JOIN contributor c ON c.id = n.contributor_id
             WHERE ${isServed} AND n.id = ${id}
          `,
          readLookups,
        ]);

        const row = rows[0];
        if (row === undefined) return null;

        const notice = toNotice(row, lookups);

        // Only the contributor and the relayers of this notice are
        // assembled. Loading the 178 contributors to keep three cost more
        // than five hundred queries per call.
        const wanted = [
          ...(notice.contributorId === null ? [] : [notice.contributorId]),
          ...notice.relayerIds,
        ];
        const loaded = yield* Effect.forEach(
          wanted,
          (contributorId) =>
            contributorsMatching({ id: contributorId, lookups }),
          { concurrency: 4 },
        );
        const byId = new Map(
          loaded.flat().map((contributor) => [contributor.id, contributor]),
        );

        return {
          notice,
          contributor:
            notice.contributorId === null
              ? null
              : (byId.get(notice.contributorId) ?? null),
          relayers: notice.relayerIds.flatMap((relayerId) => {
            const found = byId.get(relayerId);
            return found === undefined ? [] : [found];
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

        const [rows, directDomains, setDomains] = yield* Effect.all([
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
          sql<DomainRow>`
            SELECT mcdn.matching_context_id, dn.name, dn.path, dn.aliases
              FROM matching_context_domain_name mcdn
              JOIN domain_name dn ON dn.id = mcdn.domain_name_id
             ORDER BY dn.name ASC
          `,
          sql<DomainRow>`
            SELECT mcds.matching_context_id, dn.name, dn.path, dn.aliases
              FROM matching_context_domains_set mcds
              JOIN domains_set ds ON ds.id = mcds.domains_set_id
              JOIN domains_set_domain dsd ON dsd.domains_set_id = ds.id
              JOIN domain_name dn ON dn.id = dsd.domain_name_id
             ORDER BY ds.name ASC, dn.name ASC
          `,
        ]);

        const toDomainName = (row: DomainRow): DomainName => ({
          name: row.name,
          path: row.path,
          aliases: simpleArray(row.aliases),
        });

        const directByContext = groupBy(
          directDomains,
          (row) => row.matching_context_id,
          toDomainName,
        );
        const fromSetsByContext = groupBy(
          setDomains,
          (row) => row.matching_context_id,
          toDomainName,
        );

        return rows.map(
          (row): TargetingContext => ({
            id: row.id,
            noticeId: row.notice_id,
            urlRegex: fullUrlRegex(
              {
                // The order matters: `getAllRelatedDomains()` places the
                // domains of the sets before the direct domains.
                domainsSets: [{ domains: fromSetsByContext.get(row.id) ?? [] }],
                domainNames: directByContext.get(row.id) ?? [],
              },
              row.url_regex,
            ),
            excludeUrlRegex: completeExcludeUrlRegex(
              row.exclude_url_regex,
              row.notice_exclude_url_regex,
            ),
            querySelector: row.query_selector,
            xpath: row.xpath,
            exampleUrl: row.example_url,
          }),
        );
      }, Effect.orDie),

      noticeWhateverItsVisibility: Effect.fn(
        'V3Reads.noticeWhateverItsVisibility',
      )(function* (id: number) {
        const [rows, lookups] = yield* Effect.all([
          sql<NoticeRow>`
            SELECT ${noticeFields}
              FROM notice n
              LEFT JOIN contributor c ON c.id = n.contributor_id
             WHERE n.id = ${id}
          `,
          readLookups,
        ]);

        const row = rows[0];
        return row === undefined ? null : toNotice(row, lookups);
      }, Effect.orDie),

      restrictedContexts: Effect.gen(function* () {
        const rows = yield* sql<{ id: number; urlRegex: string }>`
          SELECT rc.id, rc.urlRegex
            FROM restricted_context rc
        `;

        return rows.map(
          (row): RestrictedContext => ({
            id: row.id,
            urlRegex: row.urlRegex,
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
