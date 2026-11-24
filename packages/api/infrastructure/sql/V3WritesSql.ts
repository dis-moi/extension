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
const COUNTERS = [
  { column: 'badged_count', type: 'badge', inverse: null },
  { column: 'displayed_count', type: 'display', inverse: null },
  { column: 'unfolded_count', type: 'unfold', inverse: null },
  { column: 'clicked_count', type: 'outbound-click', inverse: null },
  { column: 'liked_count', type: 'like', inverse: 'unlike' },
  { column: 'disliked_count', type: 'dislike', inverse: 'undislike' },
  { column: 'dismissed_count', type: 'dismiss', inverse: 'undismiss' },
] as const;

const splitUrl = (
  raw: string,
): { readonly host: string; readonly path: string } | null => {
  try {
    const url = new URL(raw);
    return url.host === '' ? null : { host: url.host, path: url.pathname };
  } catch {
    return null;
  }
};

// findMostSpecificFromHost tries a.b.c, then b.c, then c, and keeps the
// first known domain: an unknown subdomain attaches to the parent domain
// when it exists, instead of creating a duplicate.
const hostSuffixes = (host: string): ReadonlyArray<string> => {
  const labels = host.split('.');
  return labels.map((_, rank) => labels.slice(rank).join('.'));
};

export const V3WritesSqlLive = Layer.effect(
  V3Writes,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const mailer = yield* Mailer;
    const reads = yield* V3Reads;

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

    const lastInsertId = Effect.gen(function* () {
      const rows = yield* sql<{ id: number }>`SELECT LAST_INSERT_ID() AS id`;
      const id = rows[0]?.id;

      if (id === undefined || id === 0) {
        return yield* Effect.die(
          new Error('Insert produced no identifier: the state is doubtful.'),
        );
      }
      return id;
    });

    // What the PHP does synchronously inside the rating request:
    // NoticeRatedHandler counts, then the preUpdate hook sets updated again.
    // The cost is reproduced along with the behaviour — seven aggregates
    // over 11.6 million rows, covered by the (notice_id, type) index.
    const recomputeCounters = (noticeId: number) =>
      Effect.gen(function* () {
        const balances = yield* Effect.forEach(COUNTERS, (counter) =>
          Effect.gen(function* () {
            const [done, undone] = yield* Effect.all([
              sql<{ n: number }>`
                SELECT COUNT(*) AS n FROM rating
                 WHERE notice_id = ${noticeId} AND type = ${counter.type}
              `,
              counter.inverse === null
                ? Effect.succeed([{ n: 0 }])
                : sql<{ n: number }>`
                    SELECT COUNT(*) AS n FROM rating
                     WHERE notice_id = ${noticeId}
                       AND type = ${counter.inverse}
                  `,
            ]);

            return [
              counter.column,
              (done[0]?.n ?? 0) - (undone[0]?.n ?? 0),
            ] as const;
          }),
        );

        // Keyed by column rather than by position: the UPDATE below cannot
        // silently follow a reordering of COUNTERS.
        const balance: Record<string, number> = Object.fromEntries(balances);

        yield* sql`
          UPDATE notice SET
            badged_count = ${balance['badged_count'] ?? 0},
            displayed_count = ${balance['displayed_count'] ?? 0},
            unfolded_count = ${balance['unfolded_count'] ?? 0},
            clicked_count = ${balance['clicked_count'] ?? 0},
            liked_count = ${balance['liked_count'] ?? 0},
            disliked_count = ${balance['disliked_count'] ?? 0},
            dismissed_count = ${balance['dismissed_count'] ?? 0},
            updated = NOW()
          WHERE id = ${noticeId}
        `;
      });

    // The PHP backend itself flags the weakness of identifying by address:
    // nothing stops anyone from passing themselves off as somebody else.
    // Reproduced as it is — fixing it would be a change of behaviour, not a
    // migration — but it is worth taking up.
    const contributorForContribution = (contribution: ReceivedContribution) =>
      Effect.gen(function* () {
        if (contribution.question) {
          if (contribution.toContributorId === null) return null;

          const questioned = yield* sql<{ id: number }>`
            SELECT id FROM contributor
             WHERE id = ${contribution.toContributorId}
          `;
          if (questioned.length === 0) {
            return yield* new InvalidContribution({
              reason: "Questioned contributor doesn't exist.",
            });
          }
          return contribution.toContributorId;
        }

        const known = yield* sql<{ id: number }>`
          SELECT id FROM contributor
           WHERE email = ${contribution.contributorEmail}
        `;
        const existing = known[0];
        if (existing !== undefined) return existing.id;

        yield* sql`
          INSERT INTO contributor (name, email, enabled, total_subscriptions)
               VALUES (${contribution.contributorName},
                       ${contribution.contributorEmail}, 1, 0)
        `;
        return yield* lastInsertId;
      });

    const domainIdForHost = (host: string) =>
      Effect.gen(function* () {
        const suffixes = hostSuffixes(host);
        const known = yield* sql<{ id: number; name: string }>`
          SELECT id, name FROM domain_name WHERE name IN ${sql.in(suffixes)}
        `;

        const byName = new Map(known.map((row) => [row.name, row.id]));
        const mostSpecific = suffixes
          .map((suffix) => byName.get(suffix))
          .find((id) => id !== undefined);

        if (mostSpecific !== undefined) return mostSpecific;

        yield* sql`
          INSERT INTO domain_name (name, aliases, created_at, updated_at)
               VALUES (${host}, '', NOW(), NOW())
        `;
        return yield* lastInsertId;
      });

    return V3Writes.of({
      rate: Effect.fn('V3Writes.rate')(function* (asked: AskedRating) {
        const served = yield* sql<{ id: number }>`
          SELECT n.id
            FROM notice n
            JOIN contributor c ON c.id = n.contributor_id
           WHERE ${isServed} AND n.id = ${asked.noticeId}
        `.pipe(Effect.orDie);

        if (served.length === 0) {
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
          yield* recomputeCounters(asked.noticeId);
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      refreshSubscriptions: Effect.fn('V3Writes.refreshSubscriptions')(
        function* (extensionId: string, contributors: ReadonlyArray<number>) {
          // An unknown identifier fails the whole action, like the
          // `DomainException` of the PHP service: better to refuse the list
          // than to apply half of it.
          if (contributors.length > 0) {
            const known = yield* sql<{ id: number }>`
              SELECT id FROM contributor WHERE id IN ${sql.in(contributors)}
            `.pipe(Effect.orDie);
            const found = new Set(known.map((row) => row.id));
            const missing = contributors.find((id) => !found.has(id));

            if (missing !== undefined) {
              return yield* new UnknownContributor({ id: missing });
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

            yield* Effect.forEach(
              contributors,
              (contributorId) => sql`
                INSERT INTO subscription
                     (contributor_id, extension_id, created, updated)
                     VALUES (${contributorId}, ${extensionId}, NOW(), NOW())
                ON DUPLICATE KEY UPDATE updated = NOW()
              `,
              { discard: true },
            );
          }).pipe(sql.withTransaction, Effect.orDie);
        },
      ),

      recordContribution: Effect.fn('V3Writes.recordContribution')(function* (
        contribution: ReceivedContribution,
      ) {
        const address = splitUrl(contribution.url);
        if (address === null) {
          return yield* new InvalidContribution({
            reason: `Unable to parse URL \`${contribution.url}\`.`,
          });
        }

        // The stray brace is the PHP's own, not a typo here: NoticeAssembler
        // line 110 writes `{$contribution->getContributorEmail()}}>`, and
        // every question notice in the database carries it. Removing it
        // would silently break the parity of the admin's subject lines.
        const prefix = contribution.question
          ? `Question from ${contribution.contributorName}<${contribution.contributorEmail}}>:`
          : '';
        const message = `${prefix} ${contribution.message}`;

        const noticeId = yield* Effect.gen(function* () {
          const contributorId = yield* contributorForContribution(contribution);

          yield* sql`
              INSERT INTO notice
                   (message, contributor_id, visibility, created, updated,
                    unpublished_on_expiration)
                   VALUES (
                     ${message},
                     ${contributorId},
                     ${contribution.question ? 'question' : 'draft'},
                     NOW(), NOW(), 0
                   )
            `;
          const id = yield* lastInsertId;

          yield* sql`
              INSERT INTO matching_context
                   (notice_id, urlRegex, exampleUrl, description)
                   VALUES (
                     ${id},
                     ${address.path},
                     ${contribution.url},
                     ${`Draft posted by ${contribution.contributorName} from the extension.`}
                   )
            `;
          const contextId = yield* lastInsertId;
          const domainId = yield* domainIdForHost(address.host);

          yield* sql`
              INSERT INTO matching_context_domain_name
                   (matching_context_id, domain_name_id)
                   VALUES (${contextId}, ${domainId})
            `;

          return id;
        }).pipe(
          sql.withTransaction,
          // Only SQL errors are defects; an invalid contribution stays a
          // business answer.
          Effect.catchTag('SqlError', Effect.die),
        );

        // The notice is born a draft: the served read would not see it.
        const created = yield* reads.noticeWhateverItsVisibility(noticeId);
        if (created === null) {
          return yield* new InvalidContribution({
            reason: 'Notice created but not readable.',
          });
        }

        const contributor =
          created.contributorId === null
            ? null
            : yield* reads.contributor(created.contributorId);

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

        return { notice: created, contributor, relayers: [] };
      }),
    });
  }),
);
