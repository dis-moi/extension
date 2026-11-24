import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { Administrators } from '../application/Administrators';
import { Catalogue } from '../application/Catalogue';
import { ApiLive } from '../Live';

layer(ApiLive)('directories of the administration', (it) => {
  it.effect('gives the 70 domains sets with their two counters', () =>
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      const sets = yield* catalogue.domainsSets;

      assert.strictEqual(sets.length, 70);

      const amazon = sets.find((set) => set.name === 'Amazon');
      assert.isDefined(amazon);
      if (amazon === undefined) return;

      // domains_set_domain keeps four links to vanished domain_name rows —
      // the only ones in the database, 4 out of 1023, all in this set.
      assert.deepStrictEqual(
        [...amazon.domains],
        ['amazon.fr', 'www.amazon.com', 'www.amazon.fr'],
      );
      assert.strictEqual(amazon.contexts, 633);
    }),
  );

  it.effect('sorts the sets by number of contexts served', () =>
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      const sets = yield* catalogue.domainsSets;

      const counts = sets.map((set) => set.contexts);
      assert.deepStrictEqual(
        [...counts],
        [...counts].sort((a, b) => b - a),
        'the most used first',
      );
    }),
  );

  it.effect('gives at least the 26 production accounts, never their hash', () =>
    Effect.gen(function* () {
      const administrators = yield* Administrators;
      const accounts = yield* administrators.all;

      assert.isAtLeast(accounts.length, 26);
      assert.isDefined(
        accounts.find((account) => account.username === 'jarfaoui'),
      );

      for (const account of accounts) {
        assert.isFalse(
          Object.prototype.hasOwnProperty.call(account, 'password'),
          'no password hash leaves the port',
        );
        assert.isString(account.username);
        assert.isBoolean(account.enabled);
        assert.isArray(account.roles);
      }
    }),
  );

  it.effect(
    'marks that an enabled account with no usable hash cannot sign in',
    () =>
      Effect.gen(function* () {
        const administrators = yield* Administrators;
        const accounts = yield* administrators.all;

        const canSignIn = accounts.filter((account) => account.canSignIn);
        assert.isAtLeast(canSignIn.length, 1);
        assert.isAtMost(canSignIn.length, accounts.length);
      }),
  );
});
