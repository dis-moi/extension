import { Config, Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { Mailer } from '../../application/Mailer';
import {
  contributionBody,
  contributionSubject,
  noticeAdminUrl,
} from '../../domain/ContributionEmail';
import {
  UnknownContributor,
  InvalidContribution,
  type ReceivedContribution,
  V3Writes,
  NoticeNotFound,
  type AskedRating,
} from '../../application/V3Writes';
import { V3Reads } from '../../application/V3Reads';

// The PHP backend leaned on the Doctrine unit of work and a single flush()
// per request. Here each action opens its transaction explicitly: what must
// succeed or fail together can be read in the code.

const URL_MAX = 1000;

// Four count an action, three a balance: liked_count is the number of likes
// minus the number of times they were taken back.
const COMPTEURS = [
  { colonne: 'badged_count', type: 'badge', inverse: null },
  { colonne: 'displayed_count', type: 'display', inverse: null },
  { colonne: 'unfolded_count', type: 'unfold', inverse: null },
  { colonne: 'clicked_count', type: 'outbound-click', inverse: null },
  { colonne: 'liked_count', type: 'like', inverse: 'unlike' },
  { colonne: 'disliked_count', type: 'dislike', inverse: 'undislike' },
  { colonne: 'dismissed_count', type: 'dismiss', inverse: 'undismiss' },
] as const;

const decomposerUrl = (
  brut: string,
): { readonly host: string; readonly chemin: string } | null => {
  try {
    const url = new URL(brut);
    return url.host === '' ? null : { host: url.host, chemin: url.pathname };
  } catch {
    return null;
  }
};

// findMostSpecificFromHost tries a.b.c, then b.c, then c, and keeps the
// first known domain: an unknown subdomain attaches to the parent domain
// when it exists, instead of creating a duplicate.
const suffixesDe = (host: string): ReadonlyArray<string> => {
  const morceaux = host.split('.');
  return morceaux.map((_, i) => morceaux.slice(i).join('.'));
};

export const V3WritesSqlLive = Layer.effect(
  V3Writes,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const mailer = yield* Mailer;
    const lecture = yield* V3Reads;

    // Taken from the `.env` of the PHP backend, overridable by the environment.
    const instanceName = yield* Config.String('DISMOI_INSTANCE_NAME').pipe(
      Config.withDefault('DisMoi'),
    );
    const instanceEmail = yield* Config.String('DISMOI_INSTANCE_EMAIL').pipe(
      Config.withDefault('contribution@dismoi.io'),
    );
    const siteOrigin = yield* Config.String('DISMOI_SITE_URL').pipe(
      Config.withDefault('https://www.dismoi.io'),
    );

    // The same condition as the reads.
    const isServed = sql.literal(`
      c.enabled = 1
      AND n.visibility = 'public'
      AND (n.expires >= NOW()
           OR n.expires IS NULL
           OR (n.expires <= NOW() AND n.unpublished_on_expiration = 0))
    `);

    const dernierIdInsere = Effect.gen(function* () {
      const lignes = yield* sql<{ id: number }>`SELECT LAST_INSERT_ID() AS id`;
      const id = lignes[0]?.id;

      if (id === undefined || id === 0) {
        return yield* Effect.die(
          new Error(
            "Insertion sans identifiant engendré : l'état est douteux.",
          ),
        );
      }
      return id;
    });

    // What the PHP does synchronously inside the rating request:
    // NoticeRatedHandler counts, then the preUpdate hook sets updated again.
    // The cost is reproduced along with the behaviour — seven aggregates
    // over 11.6 million rows, covered by the (notice_id, type) index.
    const recalculerLesCompteurs = (noticeId: number) =>
      Effect.gen(function* () {
        const soldes = yield* Effect.forEach(COMPTEURS, (compteur) =>
          Effect.gen(function* () {
            const [faits, defaits] = yield* Effect.all([
              sql<{ n: number }>`
                SELECT COUNT(*) AS n FROM rating
                 WHERE notice_id = ${noticeId} AND type = ${compteur.type}
              `,
              compteur.inverse === null
                ? Effect.succeed([{ n: 0 }])
                : sql<{ n: number }>`
                    SELECT COUNT(*) AS n FROM rating
                     WHERE notice_id = ${noticeId}
                       AND type = ${compteur.inverse}
                  `,
            ]);

            return (faits[0]?.n ?? 0) - (defaits[0]?.n ?? 0);
          }),
        );

        yield* sql`
          UPDATE notice SET
            badged_count = ${soldes[0] ?? 0},
            displayed_count = ${soldes[1] ?? 0},
            unfolded_count = ${soldes[2] ?? 0},
            clicked_count = ${soldes[3] ?? 0},
            liked_count = ${soldes[4] ?? 0},
            disliked_count = ${soldes[5] ?? 0},
            dismissed_count = ${soldes[6] ?? 0},
            updated = NOW()
          WHERE id = ${noticeId}
        `;
      });

    // The PHP backend itself flags the weakness of identifying by address:
    // nothing stops anyone from passing themselves off as somebody else.
    // Reproduced as it is — fixing it would be a change of behaviour, not a
    // migration — but it is worth taking up.
    const contributeurDeLaContribution = (contribution: ReceivedContribution) =>
      Effect.gen(function* () {
        if (contribution.question) {
          if (contribution.toContributorId === null) return null;

          const trouves = yield* sql<{ id: number }>`
            SELECT id FROM contributor
             WHERE id = ${contribution.toContributorId}
          `;
          if (trouves.length === 0) {
            return yield* new InvalidContribution({
              reason: "Questioned contributor doesn't exist.",
            });
          }
          return contribution.toContributorId;
        }

        const existants = yield* sql<{ id: number }>`
          SELECT id FROM contributor
           WHERE email = ${contribution.contributorEmail}
        `;
        const existant = existants[0];
        if (existant !== undefined) return existant.id;

        yield* sql`
          INSERT INTO contributor (name, email, enabled, total_subscriptions)
               VALUES (${contribution.contributorName},
                       ${contribution.contributorEmail}, 1, 0)
        `;
        return yield* dernierIdInsere;
      });

    const domainePourHote = (host: string) =>
      Effect.gen(function* () {
        const suffixes = suffixesDe(host);
        const connus = yield* sql<{ id: number; name: string }>`
          SELECT id, name FROM domain_name WHERE name IN ${sql.in(suffixes)}
        `;

        const parNom = new Map(connus.map((ligne) => [ligne.name, ligne.id]));
        for (const suffixe of suffixes) {
          const trouve = parNom.get(suffixe);
          if (trouve !== undefined) return trouve;
        }

        yield* sql`
          INSERT INTO domain_name (name, aliases, created_at, updated_at)
               VALUES (${host}, '', NOW(), NOW())
        `;
        return yield* dernierIdInsere;
      });

    return V3Writes.of({
      rate: Effect.fn('V3Writes.rate')(function* (asked: AskedRating) {
        const servies = yield* sql<{ id: number }>`
          SELECT n.id
            FROM notice n
            JOIN contributor c ON c.id = n.contributor_id
           WHERE ${isServed} AND n.id = ${asked.noticeId}
        `.pipe(Effect.orDie);

        if (servies.length === 0) {
          return yield* new NoticeNotFound({ id: asked.noticeId });
        }

        yield* Effect.gen(function* () {
          yield* sql`
            INSERT INTO rating
              (notice_id, type, context_timestamp, context_url,
               context_geolocation, reason)
            VALUES (
              ${asked.noticeId},
              ${asked.ratingType},
              NOW(),
              ${asked.url.slice(0, URL_MAX)},
              ${asked.geolocation},
              ${asked.reason}
            )
          `;
          yield* recalculerLesCompteurs(asked.noticeId);
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      refreshSubscriptions: Effect.fn('V3Writes.refreshSubscriptions')(
        function* (extensionId: string, contributors: ReadonlyArray<number>) {
          // An unknown identifier fails the whole action, like the
          // `DomainException` of the PHP service: better to refuse the list
          // than to apply half of it.
          if (contributors.length > 0) {
            const connus = yield* sql<{ id: number }>`
              SELECT id FROM contributor WHERE id IN ${sql.in(contributors)}
            `.pipe(Effect.orDie);
            const trouves = new Set(connus.map((ligne) => ligne.id));

            for (const id of contributors) {
              if (!trouves.has(id)) {
                return yield* new UnknownContributor({ id });
              }
            }
          }

          yield* Effect.gen(function* () {
            // The extension is created when it is unknown, and its
            // confirmation date set again on each call: that is what makes
            // it possible to count the installs still alive.
            yield* sql`
              INSERT INTO extension (id, created, updated)
                   VALUES (${extensionId}, NOW(), NOW())
              ON DUPLICATE KEY UPDATE updated = NOW()
            `;

            yield* contributors.length === 0
              ? sql`DELETE FROM subscription WHERE extension_id = ${extensionId}`
              : sql`
                  DELETE FROM subscription
                   WHERE extension_id = ${extensionId}
                     AND contributor_id NOT IN ${sql.in(contributors)}
                `;

            for (const contributeurId of contributors) {
              yield* sql`
                INSERT INTO subscription
                     (contributor_id, extension_id, created, updated)
                     VALUES (${contributeurId}, ${extensionId}, NOW(), NOW())
                ON DUPLICATE KEY UPDATE updated = NOW()
              `;
            }
          }).pipe(sql.withTransaction, Effect.orDie);
        },
      ),

      recordContribution: Effect.fn('V3Writes.recordContribution')(function* (
        contribution: ReceivedContribution,
      ) {
        const adresse = decomposerUrl(contribution.url);
        if (adresse === null) {
          return yield* new InvalidContribution({
            reason: `Unable to parse URL \`${contribution.url}\`.`,
          });
        }

        // The stray brace is the PHP's own, not a typo here: NoticeAssembler
        // line 110 writes `{$contribution->getContributorEmail()}}>`, and
        // every question notice in the database carries it. Removing it
        // would silently break the parity of the admin's subject lines.
        const prefixe = contribution.question
          ? `Question from ${contribution.contributorName}<${contribution.contributorEmail}}>:`
          : '';
        const message = `${prefixe} ${contribution.message}`;

        const noticeId = yield* Effect.gen(function* () {
          const contributeurId =
            yield* contributeurDeLaContribution(contribution);

          yield* sql`
              INSERT INTO notice
                   (message, contributor_id, visibility, created, updated,
                    unpublished_on_expiration)
                   VALUES (
                     ${message},
                     ${contributeurId},
                     ${contribution.question ? 'question' : 'draft'},
                     NOW(), NOW(), 0
                   )
            `;
          const id = yield* dernierIdInsere;

          yield* sql`
              INSERT INTO matching_context
                   (notice_id, urlRegex, exampleUrl, description)
                   VALUES (
                     ${id},
                     ${adresse.chemin},
                     ${contribution.url},
                     ${`Draft posted by ${contribution.contributorName} from the extension.`}
                   )
            `;
          const contexteId = yield* dernierIdInsere;
          const domaineId = yield* domainePourHote(adresse.host);

          yield* sql`
              INSERT INTO matching_context_domain_name
                   (matching_context_id, domain_name_id)
                   VALUES (${contexteId}, ${domaineId})
            `;

          return id;
        }).pipe(
          sql.withTransaction,
          // Only SQL errors are defects; an invalid contribution stays a
          // business answer.
          Effect.catchTag('SqlError', Effect.die),
        );

        // The notice is born a draft: the served read would not see it.
        const creee = yield* lecture.noticeWhateverItsVisibility(noticeId);
        if (creee === null) {
          return yield* new InvalidContribution({
            reason: 'Notice created but not readable.',
          });
        }

        const contributor =
          creee.contributorId === null
            ? null
            : yield* lecture.contributor(creee.contributorId);

        yield* mailer.send({
          from: contribution.contributorEmail,
          to: instanceEmail,
          replyTo: contribution.contributorEmail,
          subject: contributionSubject(instanceName, {
            contributorName: contribution.contributorName,
            question: contribution.question,
            recipientName: contribution.question
              ? (contributor?.name ?? null)
              : null,
          }),
          html: contributionBody(message, noticeAdminUrl(siteOrigin, noticeId)),
        });

        return { notice: creee, contributor, relayers: [] };
      }),
    });
  }),
);
