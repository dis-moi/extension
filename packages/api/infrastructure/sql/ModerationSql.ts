import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  InvalidFields,
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

const COLONNE_DIMAGE: Readonly<Record<ContributorImageField, string>> = {
  imageFile: 'image',
  bannerImageFile: 'banner_image',
  previewImageFile: 'preview_image',
};

const videVersNull = (valeur: string | null): string | null =>
  valeur === null || valeur.trim() === '' ? null : valeur;

export const ModerationSqlLive = Layer.effect(
  Moderation,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    const contributeurExiste = (id: number) =>
      Effect.gen(function* () {
        const rows = yield* sql<{ id: number }>`
          SELECT id FROM contributor WHERE id = ${id}
        `;
        return rows.length > 0;
      });

    const noticeExiste = (id: number) =>
      Effect.gen(function* () {
        const rows = yield* sql<{ id: number }>`
          SELECT id FROM notice WHERE id = ${id}
        `;
        return rows.length > 0;
      });

    const domainePourNom = (name: string) =>
      Effect.gen(function* () {
        const connus = yield* sql<{ id: number }>`
          SELECT id FROM domain_name WHERE name = ${name}
        `;
        const connu = connus[0];
        if (connu !== undefined) return connu.id;

        yield* sql`
          INSERT INTO domain_name (name, aliases, created_at, updated_at)
               VALUES (${name}, '', NOW(), NOW())
        `;
        const crees = yield* sql<{ id: number }>`
          SELECT LAST_INSERT_ID() AS id
        `;
        return crees[0]?.id ?? 0;
      });

    const ecrireLeContexte = (noticeId: number, contexte: SubmittedContext) =>
      Effect.gen(function* () {
        let contexteId = contexte.id;

        if (contexteId === null) {
          yield* sql`
            INSERT INTO matching_context
                 (notice_id, urlRegex, excludeUrlRegex, description,
                  exampleUrl, querySelector, xpath)
                 VALUES (
                   ${noticeId}, ${contexte.urlRegex},
                   ${videVersNull(contexte.excludeUrlRegex)},
                   ${videVersNull(contexte.description)},
                   ${videVersNull(contexte.exampleUrl)},
                   ${videVersNull(contexte.querySelector)},
                   ${videVersNull(contexte.xpath)}
                 )
          `;
          const crees = yield* sql<{ id: number }>`
            SELECT LAST_INSERT_ID() AS id
          `;
          contexteId = crees[0]?.id ?? 0;
        } else {
          yield* sql`
            UPDATE matching_context SET
              urlRegex = ${contexte.urlRegex},
              excludeUrlRegex = ${videVersNull(contexte.excludeUrlRegex)},
              description = ${videVersNull(contexte.description)},
              exampleUrl = ${videVersNull(contexte.exampleUrl)},
              querySelector = ${videVersNull(contexte.querySelector)},
              xpath = ${videVersNull(contexte.xpath)}
            WHERE id = ${contexteId} AND notice_id = ${noticeId}
          `;
        }

        // The attachments are rewritten whole: that is easier to follow
        // than a difference, and the table carries only two columns.
        yield* sql`
          DELETE FROM matching_context_domain_name
           WHERE matching_context_id = ${contexteId}
        `;

        for (const name of contexte.domains) {
          const propre = name.trim();
          if (propre === '') continue;

          const domaineId = yield* domainePourNom(propre);
          yield* sql`
            INSERT IGNORE INTO matching_context_domain_name
                 (matching_context_id, domain_name_id)
                 VALUES (${contexteId}, ${domaineId})
          `;
        }

        return contexteId;
      });

    return Moderation.of({
      setVisibility: Effect.fn('Moderation.setVisibility')(function* (
        id: number,
        visibility: Visibility,
      ) {
        if (!(yield* noticeExiste(id).pipe(Effect.orDie))) {
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

        if (!(yield* noticeExiste(id).pipe(Effect.orDie))) {
          return yield* new NoticeMissing({ id });
        }

        yield* Effect.gen(function* () {
          yield* sql`
              UPDATE notice SET
                message = ${submitted.message},
                note = ${videVersNull(submitted.note)},
                visibility = ${submitted.visibility},
                locale = ${videVersNull(submitted.locale)},
                excludeUrlRegex = ${videVersNull(submitted.excludeUrlRegex)},
                expires = ${videVersNull(submitted.expires)},
                unpublished_on_expiration = ${submitted.unpublishedOnExpiration ? 1 : 0},
                contributor_id = ${submitted.contributorId},
                updated = NOW()
              WHERE id = ${id}
            `;

          // Contexts absent from the submission are removed: the form shows
          // the whole list, so an absence is a deliberate removal.
          const gardes = yield* Effect.forEach(submitted.contexts, (contexte) =>
            ecrireLeContexte(id, contexte),
          );

          yield* gardes.length === 0
            ? sql`DELETE FROM matching_context WHERE notice_id = ${id}`
            : sql`
                  DELETE FROM matching_context
                   WHERE notice_id = ${id} AND id NOT IN ${sql.in(gardes)}
                `;

          // The same goes for the relayers.
          yield* sql`DELETE FROM relay WHERE notice_id = ${id}`;
          for (const relayeurId of submitted.relayers) {
            yield* sql`
                INSERT INTO relay (notice_id, relayed_by_id, relayed_at)
                     VALUES (${id}, ${relayeurId}, NOW())
              `;
          }
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

        if (!(yield* contributeurExiste(id).pipe(Effect.orDie))) {
          return yield* new ContributorMissing({ id });
        }

        yield* Effect.gen(function* () {
          yield* sql`
            UPDATE contributor SET
              name = ${submitted.name},
              title = ${videVersNull(submitted.title)},
              email = ${videVersNull(submitted.email)},
              website = ${videVersNull(submitted.website)},
              intro = ${videVersNull(submitted.intro)},
              locale = ${videVersNull(submitted.locale)},
              categories = ${submitted.categories.join(',')},
              enabled = ${submitted.enabled ? 1 : 0},
              updated_at = NOW()
            WHERE id = ${id}
          `;

          // The pins carry an order: they are rewritten whole so that the
          // rank follows the submitted list.
          yield* sql`DELETE FROM pin WHERE contributor_id = ${id}`;
          for (const [rang, noticeId] of submitted.pinned.entries()) {
            yield* sql`
              INSERT INTO pin (contributor_id, notice_id, sort)
                   VALUES (${id}, ${noticeId}, ${rang})
            `;
          }
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      saveContributorImage: Effect.fn('Moderation.saveContributorImage')(
        function* (
          id: number,
          champ: ContributorImageField,
          nomDeFichier: string,
        ) {
          const colonne = sql(COLONNE_DIMAGE[champ]);

          const precedente = yield* Effect.gen(function* () {
            const avant = yield* sql<{ precedente: string | null }>`
            SELECT ${colonne} AS precedente FROM contributor WHERE id = ${id}
          `;

            // An image set on an identifier that does not exist would leave
            // a file in the store and announce a success.
            if (avant[0] === undefined) return null;

            yield* sql`
            UPDATE contributor SET ${colonne} = ${nomDeFichier},
                   updated_at = NOW()
             WHERE id = ${id}
          `;

            return { remplacee: avant[0].precedente };
          }).pipe(sql.withTransaction, Effect.orDie);

          if (precedente === null) {
            return yield* new ContributorMissing({ id });
          }

          return precedente.remplacee;
        },
      ),
    });
  }),
);
