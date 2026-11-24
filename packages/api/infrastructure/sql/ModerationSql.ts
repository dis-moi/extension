import { Effect, Layer, Option } from 'effect';
import { SqlClient } from 'effect/sql';
import { InvalidFields } from '../../application/InvalidFields';
import {
  type SubmittedContext,
  ContributorMissing,
  type SubmittedContributor,
  Moderation,
  NoticeMissing,
  type SubmittedNotice,
} from '../../application/Moderation';
import { contributorViolations } from '../../domain/ContributorSubmission';
import type { ContributorImageField } from '../../domain/UploadedImage';
import { noticeViolations } from '../../domain/NoticeSubmission';
import type { Visibility } from '../../domain/NoticeVisibility';

// Every action is a transaction: a notice and its contexts form a whole.
// And notice.updated is set again on each write, like the preUpdate hook of
// Doctrine — the extension uses it to order the notices of a contributor, so
// forgetting it would change what people see.

const IMAGE_COLUMN: Readonly<Record<ContributorImageField, string>> = {
  imageFile: 'image',
  bannerImageFile: 'banner_image',
  previewImageFile: 'preview_image',
};

const emptyToNull = (value: string | null): string | null =>
  value === null || value.trim() === '' ? null : value;

export const ModerationSqlLive = Layer.effect(
  Moderation,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    const exists = (table: 'contributor' | 'notice', id: number) =>
      Effect.map(
        sql<{ id: number }>`SELECT id FROM ${sql(table)} WHERE id = ${id}`,
        (rows) => rows.length > 0,
      );

    const lastInsertId = Effect.map(
      sql<{ id: number }>`SELECT LAST_INSERT_ID() AS id`,
      (rows) => rows[0]?.id ?? 0,
    );

    const domainIdForName = (name: string) =>
      Effect.gen(function* () {
        const known = yield* sql<{ id: number }>`
          SELECT id FROM domain_name WHERE name = ${name}
        `;
        const existing = known[0];
        if (existing !== undefined) return existing.id;

        yield* sql`
          INSERT INTO domain_name (name, aliases, created_at, updated_at)
               VALUES (${name}, '', NOW(), NOW())
        `;
        return yield* lastInsertId;
      });

    const writeContext = (noticeId: number, context: SubmittedContext) =>
      Effect.gen(function* () {
        let contextId = context.id;

        if (contextId === null) {
          yield* sql`
            INSERT INTO matching_context
                 (notice_id, urlRegex, excludeUrlRegex, description,
                  exampleUrl, querySelector, xpath)
                 VALUES (
                   ${noticeId}, ${context.urlRegex},
                   ${emptyToNull(context.excludeUrlRegex)},
                   ${emptyToNull(context.description)},
                   ${emptyToNull(context.exampleUrl)},
                   ${emptyToNull(context.querySelector)},
                   ${emptyToNull(context.xpath)}
                 )
          `;
          contextId = yield* lastInsertId;
        } else {
          yield* sql`
            UPDATE matching_context SET
              urlRegex = ${context.urlRegex},
              excludeUrlRegex = ${emptyToNull(context.excludeUrlRegex)},
              description = ${emptyToNull(context.description)},
              exampleUrl = ${emptyToNull(context.exampleUrl)},
              querySelector = ${emptyToNull(context.querySelector)},
              xpath = ${emptyToNull(context.xpath)}
            WHERE id = ${contextId} AND notice_id = ${noticeId}
          `;
        }

        // The attachments are rewritten whole: that is easier to follow
        // than a difference, and the table carries only two columns.
        yield* sql`
          DELETE FROM matching_context_domain_name
           WHERE matching_context_id = ${contextId}
        `;

        const names = context.domains
          .map((name) => name.trim())
          .filter((name) => name !== '');

        yield* Effect.forEach(
          names,
          (name) =>
            Effect.gen(function* () {
              const domainId = yield* domainIdForName(name);
              yield* sql`
                INSERT IGNORE INTO matching_context_domain_name
                     (matching_context_id, domain_name_id)
                     VALUES (${contextId}, ${domainId})
              `;
            }),
          { discard: true },
        );

        // The sets, on the same principle. A set is never created here: it
        // is picked from those the administration lists.
        yield* sql`
          DELETE FROM matching_context_domains_set
           WHERE matching_context_id = ${contextId}
        `;

        yield* Effect.forEach(
          context.domainsSets,
          (setId) => sql`
            INSERT IGNORE INTO matching_context_domains_set
                 (matching_context_id, domains_set_id)
                 VALUES (${contextId}, ${setId})
          `,
          { discard: true },
        );

        return contextId;
      });

    return Moderation.of({
      setVisibility: Effect.fn('Moderation.setVisibility')(function* (
        id: number,
        visibility: Visibility,
      ) {
        if (!(yield* exists('notice', id).pipe(Effect.orDie))) {
          return yield* new NoticeMissing({ id });
        }

        yield* sql`
            UPDATE notice
               SET visibility = ${visibility}, updated = NOW()
             WHERE id = ${id}
          `.pipe(Effect.orDie);
      }),

      saveNotice: Effect.fn('Moderation.saveNotice')(function* (
        id: number,
        submitted: SubmittedNotice,
      ) {
        const reasons = noticeViolations(submitted);
        if (reasons.length > 0) {
          return yield* new InvalidFields({ reasons });
        }

        if (!(yield* exists('notice', id).pipe(Effect.orDie))) {
          return yield* new NoticeMissing({ id });
        }

        yield* Effect.gen(function* () {
          yield* sql`
              UPDATE notice SET
                message = ${submitted.message},
                note = ${emptyToNull(submitted.note)},
                visibility = ${submitted.visibility},
                locale = ${emptyToNull(submitted.locale)},
                excludeUrlRegex = ${emptyToNull(submitted.excludeUrlRegex)},
                expires = ${emptyToNull(submitted.expires)},
                unpublished_on_expiration = ${submitted.unpublishedOnExpiration ? 1 : 0},
                contributor_id = ${submitted.contributorId},
                updated = NOW()
              WHERE id = ${id}
            `;

          // Contexts absent from the submission are removed: the form shows
          // the whole list, so an absence is a deliberate removal.
          const kept = yield* Effect.forEach(submitted.contexts, (context) =>
            writeContext(id, context),
          );

          yield* kept.length === 0
            ? sql`DELETE FROM matching_context WHERE notice_id = ${id}`
            : sql`
                  DELETE FROM matching_context
                   WHERE notice_id = ${id} AND id NOT IN ${sql.in(kept)}
                `;

          // The same goes for the relayers.
          yield* sql`DELETE FROM relay WHERE notice_id = ${id}`;
          yield* Effect.forEach(
            submitted.relayers,
            (relayerId) => sql`
                INSERT INTO relay (notice_id, relayed_by_id, relayed_at)
                     VALUES (${id}, ${relayerId}, NOW())
              `,
            { discard: true },
          );
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      saveContributor: Effect.fn('Moderation.saveContributor')(function* (
        id: number,
        submitted: SubmittedContributor,
      ) {
        const reasons = contributorViolations(submitted);
        if (reasons.length > 0) {
          return yield* new InvalidFields({ reasons });
        }

        if (!(yield* exists('contributor', id).pipe(Effect.orDie))) {
          return yield* new ContributorMissing({ id });
        }

        yield* Effect.gen(function* () {
          yield* sql`
            UPDATE contributor SET
              name = ${submitted.name},
              title = ${emptyToNull(submitted.title)},
              email = ${emptyToNull(submitted.email)},
              website = ${emptyToNull(submitted.website)},
              intro = ${emptyToNull(submitted.intro)},
              locale = ${emptyToNull(submitted.locale)},
              categories = ${submitted.categories.join(',')},
              enabled = ${submitted.enabled ? 1 : 0},
              updated_at = NOW()
            WHERE id = ${id}
          `;

          // The pins carry an order: they are rewritten whole so that the
          // rank follows the submitted list.
          yield* sql`DELETE FROM pin WHERE contributor_id = ${id}`;
          yield* Effect.forEach(
            submitted.pinned.entries(),
            ([rank, noticeId]) => sql`
              INSERT INTO pin (contributor_id, notice_id, sort)
                   VALUES (${id}, ${noticeId}, ${rank})
            `,
            { discard: true },
          );
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      saveContributorImage: Effect.fn('Moderation.saveContributorImage')(
        function* (id: number, field: ContributorImageField, fileName: string) {
          const column = sql(IMAGE_COLUMN[field]);

          // An image set on an identifier that does not exist would leave a
          // file in the store and announce a success. None distinguishes
          // that from a contributor whose column is still empty.
          const replaced = yield* Effect.gen(function* () {
            const rows = yield* sql<{ previous: string | null }>`
              SELECT ${column} AS previous FROM contributor WHERE id = ${id}
            `;

            const row = rows[0];
            if (row === undefined) return Option.none<string | null>();

            yield* sql`
              UPDATE contributor SET ${column} = ${fileName},
                     updated_at = NOW()
               WHERE id = ${id}
            `;

            return Option.some(row.previous);
          }).pipe(sql.withTransaction, Effect.orDie);

          if (Option.isNone(replaced)) {
            return yield* new ContributorMissing({ id });
          }

          return replaced.value;
        },
      ),

      saveNoticeScreenshot: Effect.fn('Moderation.saveNoticeScreenshot')(
        function* (id: number, fileName: string | null) {
          const replaced = yield* Effect.gen(function* () {
            const rows = yield* sql<{ previous: string | null }>`
              SELECT screenshot AS previous FROM notice WHERE id = ${id}
            `;

            const row = rows[0];
            if (row === undefined) return Option.none<string | null>();

            yield* sql`
              UPDATE notice SET screenshot = ${fileName}, updated = NOW()
               WHERE id = ${id}
            `;

            return Option.some(row.previous);
          }).pipe(sql.withTransaction, Effect.orDie);

          if (Option.isNone(replaced)) {
            return yield* new NoticeMissing({ id });
          }

          return replaced.value;
        },
      ),
    });
  }),
);
