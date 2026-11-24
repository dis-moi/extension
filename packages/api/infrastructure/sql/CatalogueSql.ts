import { Effect, Layer, Option } from 'effect';
import { SqlClient } from 'effect/sql';
import { InvalidFields } from '../../application/InvalidFields';
import {
  Catalogue,
  type DomainEntry,
  type DomainsSetEntry,
  EntryMissing,
  NameTaken,
  type RestrictedContextEntry,
  StillUsed,
  type SubmittedDomain,
  type SubmittedDomainsSet,
} from '../../application/Catalogue';
import {
  domainsSetViolations,
  domainViolations,
  restrictedContextViolations,
} from '../../domain/CatalogueSubmission';
import { containing } from './likePattern';
import { simpleArray } from './simpleArray';

// The foreign keys of matching_context_domain_name and
// matching_context_domains_set are NO ACTION: Doctrine removed the links in
// PHP. Here a delete that would break one is refused instead, and says what
// holds it back.

interface DomainRow {
  readonly id: number;
  readonly name: string;
  readonly path: string | null;
  readonly aliases: string | null;
  readonly contexts: number;
  readonly sets: string | null;
}

const toDomain = (row: DomainRow): DomainEntry => ({
  id: row.id,
  name: row.name,
  path: row.path,
  aliases: simpleArray(row.aliases),
  contexts: Number(row.contexts),
  sets: simpleArray(row.sets),
});

export const CatalogueSqlLive = Layer.effect(
  Catalogue,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    const lastInsertId = Effect.map(
      sql<{ id: number }>`SELECT LAST_INSERT_ID() AS id`,
      (rows) => rows[0]?.id ?? 0,
    );

    const exists = (
      table: 'domain_name' | 'domains_set' | 'restricted_context',
      id: number,
    ) =>
      Effect.map(
        sql<{ id: number }>`SELECT id FROM ${sql(table)} WHERE id = ${id}`,
        (rows) => rows.length > 0,
      );

    const domainFields = sql`
      d.id, d.name AS name, d.path, d.aliases,
      (SELECT COUNT(*) FROM matching_context_domain_name l
        WHERE l.domain_name_id = d.id) AS contexts,
      (SELECT GROUP_CONCAT(s.name ORDER BY s.name SEPARATOR ',')
         FROM domains_set_domain sd
         JOIN domains_set s ON s.id = sd.domains_set_id
        WHERE sd.domain_name_id = d.id) AS sets
    `;

    // A name is created rather than refused, as the notice form does: the
    // field is typed, and a set of domains is the place one gathers them.
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

    // What a domain is attached to, and what therefore holds its removal
    // back: targeting contexts naming it, and sets gathering it.
    const domainHolders = (id: number) =>
      Effect.gen(function* () {
        const contexts = yield* sql<{ total: number }>`
          SELECT COUNT(*) AS total FROM matching_context_domain_name
           WHERE domain_name_id = ${id}
        `;

        const sets = yield* sql<{ total: number }>`
          SELECT COUNT(*) AS total FROM domains_set_domain
           WHERE domain_name_id = ${id}
        `;

        return {
          contexts: Number(contexts[0]?.total ?? 0),
          sets: Number(sets[0]?.total ?? 0),
        };
      });

    return Catalogue.of({
      domains: Effect.fn('Catalogue.domains')(function* (
        search: string | null,
        limit: number,
      ) {
        const term = search === null ? null : search.trim();

        const rows = yield* (
          term === null || term === ''
            ? sql<DomainRow>`
                SELECT ${domainFields} FROM domain_name d
                 ORDER BY contexts DESC, d.name LIMIT ${limit}
              `
            : sql<DomainRow>`
                SELECT ${domainFields} FROM domain_name d
                 WHERE d.name LIKE ${containing(term)}
                    OR d.aliases LIKE ${containing(term)}
                 ORDER BY contexts DESC, d.name LIMIT ${limit}
              `
        ).pipe(Effect.orDie);

        return rows.map(toDomain);
      }),

      domain: Effect.fn('Catalogue.domain')(function* (id: number) {
        const rows = yield* sql<DomainRow>`
          SELECT ${domainFields} FROM domain_name d WHERE d.id = ${id}
        `.pipe(Effect.orDie);

        const row = rows[0];
        return row === undefined ? null : toDomain(row);
      }),

      domainCount: Effect.map(
        sql<{ total: number }>`SELECT COUNT(*) AS total FROM domain_name`,
        (rows) => Number(rows[0]?.total ?? 0),
      ).pipe(Effect.orDie),

      saveDomain: Effect.fn('Catalogue.saveDomain')(function* (
        id: number | null,
        submitted: SubmittedDomain,
      ) {
        const reasons = domainViolations(submitted);
        if (reasons.length > 0) return yield* new InvalidFields({ reasons });

        const aliases = submitted.aliases.join(',');

        if (id === null) {
          yield* sql`
            INSERT INTO domain_name (name, path, aliases, created_at, updated_at)
                 VALUES (${submitted.name}, ${submitted.path}, ${aliases},
                         NOW(), NOW())
          `.pipe(Effect.orDie);

          return yield* lastInsertId.pipe(Effect.orDie);
        }

        if (!(yield* exists('domain_name', id).pipe(Effect.orDie))) {
          return yield* new EntryMissing({ id });
        }

        yield* sql`
          UPDATE domain_name
             SET name = ${submitted.name}, path = ${submitted.path},
                 aliases = ${aliases}, updated_at = NOW()
           WHERE id = ${id}
        `.pipe(Effect.orDie);

        return id;
      }),

      deleteDomain: Effect.fn('Catalogue.deleteDomain')(function* (id: number) {
        if (!(yield* exists('domain_name', id).pipe(Effect.orDie))) {
          return yield* new EntryMissing({ id });
        }

        const held = yield* domainHolders(id).pipe(Effect.orDie);
        if (held.contexts > 0 || held.sets > 0) {
          return yield* new StillUsed({ id, ...held });
        }

        yield* sql`DELETE FROM domain_name WHERE id = ${id}`.pipe(Effect.orDie);
      }),

      domainsSets: Effect.gen(function* () {
        const rows = yield* sql<{
          id: number;
          name: string;
          domains: string | null;
          contexts: number;
        }>`
          SELECT s.id, s.name AS name,
                 (SELECT GROUP_CONCAT(d.name ORDER BY d.name SEPARATOR ',')
                    FROM domains_set_domain sd
                    JOIN domain_name d ON d.id = sd.domain_name_id
                   WHERE sd.domains_set_id = s.id) AS domains,
                 (SELECT COUNT(*) FROM matching_context_domains_set l
                   WHERE l.domains_set_id = s.id) AS contexts
            FROM domains_set s
           ORDER BY contexts DESC, s.name
        `;

        return rows.map(
          (row): DomainsSetEntry => ({
            id: row.id,
            name: row.name,
            domains: simpleArray(row.domains),
            contexts: Number(row.contexts),
          }),
        );
      }).pipe(Effect.orDie),

      saveDomainsSet: Effect.fn('Catalogue.saveDomainsSet')(function* (
        id: number | null,
        submitted: SubmittedDomainsSet,
      ) {
        const reasons = domainsSetViolations(submitted);
        if (reasons.length > 0) return yield* new InvalidFields({ reasons });

        // domains_set.name carries a UNIQUE index: without this the insert
        // comes back as a defect rather than as something to correct.
        const sameName = yield* sql<{ id: number }>`
          SELECT id FROM domains_set WHERE name = ${submitted.name}
        `.pipe(Effect.orDie);

        const taken = sameName[0];
        if (taken !== undefined && taken.id !== id) {
          return yield* new NameTaken({ name: submitted.name });
        }

        if (
          id !== null &&
          !(yield* exists('domains_set', id).pipe(Effect.orDie))
        ) {
          return yield* new EntryMissing({ id });
        }

        const names = submitted.domains
          .map((name) => name.trim())
          .filter((name) => name !== '');

        return yield* Effect.gen(function* () {
          let setId = id;

          if (setId === null) {
            yield* sql`
              INSERT INTO domains_set (name, created_at, updated_at)
                   VALUES (${submitted.name}, NOW(), NOW())
            `;
            setId = yield* lastInsertId;
          } else {
            yield* sql`
              UPDATE domains_set
                 SET name = ${submitted.name}, updated_at = NOW()
               WHERE id = ${setId}
            `;
          }

          // Rewritten whole, like the attachments of a targeting context.
          yield* sql`
            DELETE FROM domains_set_domain WHERE domains_set_id = ${setId}
          `;

          yield* Effect.forEach(
            names,
            (name) =>
              Effect.gen(function* () {
                const domainId = yield* domainIdForName(name);
                yield* sql`
                  INSERT IGNORE INTO domains_set_domain
                       (domains_set_id, domain_name_id)
                       VALUES (${setId}, ${domainId})
                `;
              }),
            { discard: true },
          );

          return setId;
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      deleteDomainsSet: Effect.fn('Catalogue.deleteDomainsSet')(function* (
        id: number,
      ) {
        if (!(yield* exists('domains_set', id).pipe(Effect.orDie))) {
          return yield* new EntryMissing({ id });
        }

        const used = yield* sql<{ total: number }>`
          SELECT COUNT(*) AS total FROM matching_context_domains_set
           WHERE domains_set_id = ${id}
        `.pipe(Effect.orDie);

        const contexts = Number(used[0]?.total ?? 0);
        if (contexts > 0) {
          return yield* new StillUsed({ id, contexts, sets: 0 });
        }

        // Its own attachments go with it: they describe the set, they are
        // not users of it.
        yield* Effect.gen(function* () {
          yield* sql`
            DELETE FROM domains_set_domain WHERE domains_set_id = ${id}
          `;
          yield* sql`DELETE FROM domains_set WHERE id = ${id}`;
        }).pipe(sql.withTransaction, Effect.orDie);
      }),

      restrictedContexts: Effect.gen(function* () {
        const rows = yield* sql<RestrictedContextEntry>`
          SELECT id, urlRegex FROM restricted_context ORDER BY id
        `;

        return rows.map(
          (row): RestrictedContextEntry => ({
            id: row.id,
            urlRegex: row.urlRegex,
          }),
        );
      }).pipe(Effect.orDie),

      saveRestrictedContext: Effect.fn('Catalogue.saveRestrictedContext')(
        function* (id: number | null, urlRegex: string) {
          const reasons = restrictedContextViolations({ urlRegex });
          if (reasons.length > 0) return yield* new InvalidFields({ reasons });

          if (id === null) {
            yield* sql`
              INSERT INTO restricted_context (urlRegex) VALUES (${urlRegex})
            `.pipe(Effect.orDie);

            return yield* lastInsertId.pipe(Effect.orDie);
          }

          if (!(yield* exists('restricted_context', id).pipe(Effect.orDie))) {
            return yield* new EntryMissing({ id });
          }

          yield* sql`
            UPDATE restricted_context SET urlRegex = ${urlRegex}
             WHERE id = ${id}
          `.pipe(Effect.orDie);

          return id;
        },
      ),

      deleteRestrictedContext: Effect.fn('Catalogue.deleteRestrictedContext')(
        function* (id: number) {
          if (!(yield* exists('restricted_context', id).pipe(Effect.orDie))) {
            return yield* new EntryMissing({ id });
          }

          yield* sql`DELETE FROM restricted_context WHERE id = ${id}`.pipe(
            Effect.orDie,
          );
        },
      ),
    });
  }),
);
