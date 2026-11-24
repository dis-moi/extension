process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';

import { assert, layer } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { Catalogue } from '../application/Catalogue';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { CatalogueSqlLive } from '../infrastructure/sql/CatalogueSql';

const TestLayer = CatalogueSqlLive.pipe(Layer.provideMerge(DatabaseLive));

const NOTICE = 91;
const CONTEXT = 91;

const wipe = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  yield* sql`DELETE FROM matching_context_domain_name WHERE matching_context_id = ${CONTEXT}`;
  yield* sql`DELETE FROM matching_context_domains_set WHERE matching_context_id = ${CONTEXT}`;
  yield* sql`DELETE FROM matching_context WHERE id = ${CONTEXT}`;
  yield* sql`DELETE FROM notice WHERE id = ${NOTICE}`;
  yield* sql`DELETE FROM domains_set_domain WHERE domains_set_id IN (SELECT id FROM domains_set WHERE name LIKE 'Essai %')`;
  yield* sql`DELETE FROM domains_set WHERE name LIKE 'Essai %'`;
  yield* sql`DELETE FROM domain_name WHERE name LIKE '%.essai'`;
  yield* sql`DELETE FROM restricted_context WHERE urlRegex LIKE '%essai%'`;

  yield* sql`
    INSERT INTO notice (id, message, visibility, unpublished_on_expiration, updated)
         VALUES (${NOTICE}, 'Notice du catalogue', 'public', 0, NOW())
  `;
  yield* sql`
    INSERT INTO matching_context (id, notice_id, urlRegex)
         VALUES (${CONTEXT}, ${NOTICE}, '/article/')
  `;
});

const attachToContext = (domainId: number) =>
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    yield* sql`
      INSERT INTO matching_context_domain_name (matching_context_id, domain_name_id)
           VALUES (${CONTEXT}, ${domainId})
    `;
  });

layer(TestLayer)('the domains of the catalogue', (it) => {
  it.effect('creates a domain with its path and its aliases', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomain(null, {
        name: 'boutique.essai',
        path: '/fr',
        aliases: ['boutique.essai', 'shop.essai'],
      });

      const saved = yield* catalogue.domain(id);

      assert.strictEqual(saved?.name, 'boutique.essai');
      assert.strictEqual(saved?.path, '/fr');
      assert.deepStrictEqual(
        [...(saved?.aliases ?? [])],
        ['boutique.essai', 'shop.essai'],
      );
    }),
  );

  it.effect('refuses a name that is not a host', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const refusal = yield* catalogue
        .saveDomain(null, {
          name: 'https://boutique.essai',
          path: null,
          aliases: [],
        })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('refuses to edit a domain that does not exist', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const refusal = yield* catalogue
        .saveDomain(424242, { name: 'ailleurs.essai', path: null, aliases: [] })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'EntryMissing');
    }),
  );

  it.effect('finds a domain by a fragment of its aliases', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      yield* catalogue.saveDomain(null, {
        name: 'boutique.essai',
        path: null,
        aliases: ['vitrine.essai'],
      });

      const found = yield* catalogue.domains('vitrine', 10);

      assert.deepStrictEqual(
        found.map((domain) => domain.name),
        ['boutique.essai'],
      );
    }),
  );

  it.effect('deletes a domain nothing holds', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomain(null, {
        name: 'jetable.essai',
        path: null,
        aliases: [],
      });

      yield* catalogue.deleteDomain(id);

      assert.isNull(yield* catalogue.domain(id));
    }),
  );

  it.effect('refuses to delete a domain a targeting context names', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomain(null, {
        name: 'cible.essai',
        path: null,
        aliases: [],
      });
      yield* attachToContext(id);

      const refusal = yield* catalogue.deleteDomain(id).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'StillUsed');
      assert.isNotNull(yield* catalogue.domain(id));
    }),
  );

  it.effect('counts the contexts that name the domain', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomain(null, {
        name: 'compte.essai',
        path: null,
        aliases: [],
      });
      yield* attachToContext(id);

      assert.strictEqual((yield* catalogue.domain(id))?.contexts, 1);
    }),
  );
});

layer(TestLayer)('the domains sets of the catalogue', (it) => {
  it.effect('creates a set and the domains it names', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomainsSet(null, {
        name: 'Essai marchands',
        domains: ['a.essai', 'b.essai'],
      });

      const sets = yield* catalogue.domainsSets;
      const saved = sets.find((set) => set.id === id);

      assert.deepStrictEqual(
        [...(saved?.domains ?? [])],
        ['a.essai', 'b.essai'],
      );
    }),
  );

  it.effect('rewrites the members of a set whole', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomainsSet(null, {
        name: 'Essai presse',
        domains: ['a.essai', 'b.essai'],
      });

      yield* catalogue.saveDomainsSet(id, {
        name: 'Essai presse',
        domains: ['b.essai'],
      });

      const sets = yield* catalogue.domainsSets;

      assert.deepStrictEqual(
        [...(sets.find((set) => set.id === id)?.domains ?? [])],
        ['b.essai'],
      );
    }),
  );

  it.effect('refuses a name another set already carries', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      yield* catalogue.saveDomainsSet(null, {
        name: 'Essai doublon',
        domains: [],
      });

      const refusal = yield* catalogue
        .saveDomainsSet(null, { name: 'Essai doublon', domains: [] })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'NameTaken');
    }),
  );

  it.effect('lets a set keep its own name when edited', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomainsSet(null, {
        name: 'Essai stable',
        domains: [],
      });

      const again = yield* catalogue.saveDomainsSet(id, {
        name: 'Essai stable',
        domains: ['c.essai'],
      });

      assert.strictEqual(again, id);
    }),
  );

  it.effect('refuses an empty name', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const refusal = yield* catalogue
        .saveDomainsSet(null, { name: '  ', domains: [] })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('deletes a set with its members', () =>
    Effect.gen(function* () {
      yield* wipe;
      const sql = yield* SqlClient.SqlClient;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomainsSet(null, {
        name: 'Essai jetable',
        domains: ['d.essai'],
      });

      yield* catalogue.deleteDomainsSet(id);

      const links = yield* sql<{ total: number }>`
        SELECT COUNT(*) AS total FROM domains_set_domain
         WHERE domains_set_id = ${id}
      `;

      assert.strictEqual(Number(links[0]?.total), 0);
      assert.isUndefined(
        (yield* catalogue.domainsSets).find((set) => set.id === id),
      );
    }),
  );

  it.effect('refuses to delete a set a targeting context uses', () =>
    Effect.gen(function* () {
      yield* wipe;
      const sql = yield* SqlClient.SqlClient;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveDomainsSet(null, {
        name: 'Essai servi',
        domains: [],
      });
      yield* sql`
        INSERT INTO matching_context_domains_set (matching_context_id, domains_set_id)
             VALUES (${CONTEXT}, ${id})
      `;

      const refusal = yield* catalogue.deleteDomainsSet(id).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'StillUsed');
    }),
  );
});

layer(TestLayer)('the restricted contexts of the catalogue', (it) => {
  it.effect('creates a pattern and lists it', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveRestrictedContext(
        null,
        '^https://banque\\.essai',
      );

      const listed = (yield* catalogue.restrictedContexts).find(
        (entry) => entry.id === id,
      );

      assert.strictEqual(listed?.urlRegex, '^https://banque\\.essai');
    }),
  );

  it.effect('refuses a pattern that does not compile', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const refusal = yield* catalogue
        .saveRestrictedContext(null, '(essai')
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('edits a pattern in place', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveRestrictedContext(null, 'essai/un');
      yield* catalogue.saveRestrictedContext(id, 'essai/deux');

      const listed = (yield* catalogue.restrictedContexts).find(
        (entry) => entry.id === id,
      );

      assert.strictEqual(listed?.urlRegex, 'essai/deux');
    }),
  );

  it.effect('deletes a pattern', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const id = yield* catalogue.saveRestrictedContext(null, 'essai/trois');
      yield* catalogue.deleteRestrictedContext(id);

      assert.isUndefined(
        (yield* catalogue.restrictedContexts).find((entry) => entry.id === id),
      );
    }),
  );

  it.effect('refuses to delete a pattern that does not exist', () =>
    Effect.gen(function* () {
      yield* wipe;
      const catalogue = yield* Catalogue;

      const refusal = yield* catalogue
        .deleteRestrictedContext(424242)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'EntryMissing');
    }),
  );
});
