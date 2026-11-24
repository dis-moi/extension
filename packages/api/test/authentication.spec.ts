process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';

import bcrypt from 'bcryptjs';
import { describe, expect, it as itSimple } from 'vitest';
import { assert, layer } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  hasRole,
  Administrators,
  effectiveRoles,
} from '../application/Administrators';
import { AdminSession } from '../application/AdminSession';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { AdministratorsSqlLive } from '../infrastructure/sql/AdministratorsSql';

const AuthLive = AdminSession.layer.pipe(
  Layer.provideMerge(AdministratorsSqlLive),
  Layer.provideMerge(DatabaseLive),
);

const PREFIX_WRITTEN_BY_FOS_USER_BUNDLE = '$2y$';

const seed = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  const hash = (yield* Effect.promise(() =>
    bcrypt.hash('bon-mot-de-passe', 13),
  )).replace(/^\$2[aby]\$/, PREFIX_WRITTEN_BY_FOS_USER_BUNDLE);

  // DELETE in dependency order: TRUNCATE would refuse a table referenced by
  // a foreign key, and disabling the checks would only hold for the current
  // connection.
  yield* sql`DELETE FROM user_contributor`;
  yield* sql`DELETE FROM fos_user`;
  yield* sql`
    INSERT INTO fos_user
         (id, username, username_canonical, email, email_canonical, enabled,
          password, roles)
         VALUES
         (1, 'Alice', 'alice', 'Alice@Exemple.fr', 'alice@exemple.fr', 1,
          ${hash}, 'a:1:{i:0;s:10:"ROLE_ADMIN";}'),
         (2, 'Bob', 'bob', 'bob@exemple.fr', 'bob@exemple.fr', 0,
          ${hash}, 'a:1:{i:0;s:10:"ROLE_ADMIN";}'),
         (3, 'Chef', 'chef', 'chef@exemple.fr', 'chef@exemple.fr', 1,
          ${hash}, 'a:1:{i:0;s:16:"ROLE_SUPER_ADMIN";}')
  `;
});

layer(AuthLive)('authentication of the administration', (it) => {
  it.effect('accepts a password set by PHP', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const account = yield* administrators.authenticate(
        'alice',
        'bon-mot-de-passe',
      );

      assert.strictEqual(account.id, 1);
      assert.strictEqual(account.username, 'Alice');
      assert.deepStrictEqual([...account.roles], ['ROLE_ADMIN']);
    }),
  );

  it.effect('accepts the address too, in whatever case', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const account = yield* administrators.authenticate(
        '  Alice@Exemple.FR  ',
        'bon-mot-de-passe',
      );

      assert.strictEqual(account.id, 1);
    }),
  );

  it.effect('refuses a wrong password', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const failure = yield* administrators
        .authenticate('alice', 'mauvais')
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'InvalidCredentials');
    }),
  );

  it.effect('refuses a disabled account, right password included', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const failure = yield* administrators
        .authenticate('bob', 'bon-mot-de-passe')
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'InvalidCredentials');
    }),
  );

  it.effect('refuses an unknown account without revealing it is unknown', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const failure = yield* administrators
        .authenticate('personne', 'bon-mot-de-passe')
        .pipe(Effect.flip);

      assert.strictEqual(failure._tag, 'InvalidCredentials');
    }),
  );

  it.effect('takes as long to refuse an unknown account as a known one', () =>
    Effect.gen(function* () {
      yield* seed;
      const administrators = yield* Administrators;

      const elapsed = (login: string) =>
        Effect.gen(function* () {
          const start = Date.now();
          yield* administrators
            .authenticate(login, 'mauvais-mot-de-passe')
            .pipe(Effect.flip);
          return Date.now() - start;
        });

      const known = yield* elapsed('alice');
      const unknown = yield* elapsed('personne');

      assert.isAtLeast(unknown, known / 2);
    }),
  );

  it.effect('records the date of the last login', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const administrators = yield* Administrators;

      yield* administrators.authenticate('alice', 'bon-mot-de-passe');

      const rows = yield* sql<{ last_login: string | null }>`
        SELECT last_login FROM fos_user WHERE id = 1
      `;
      assert.isNotNull(rows[0]?.last_login);
    }),
  );

  describe('session', () => {
    it.effect('opens a token that reading gives back to the same account', () =>
      Effect.gen(function* () {
        yield* seed;
        const administrators = yield* Administrators;
        const session = yield* AdminSession;

        const account = yield* administrators.authenticate(
          'alice',
          'bon-mot-de-passe',
        );
        const token = yield* session.open(account);
        const read = yield* session.read(token);

        assert.strictEqual(read?.id, 1);
      }),
    );

    it.effect('gives null on a missing, empty or tampered token', () =>
      Effect.gen(function* () {
        yield* seed;
        const session = yield* AdminSession;

        assert.isNull(yield* session.read(undefined));
        assert.isNull(yield* session.read(''));
        assert.isNull(yield* session.read('pas.un.jeton'));
      }),
    );

    it.effect(
      'gives null once the account has been disabled, the roles being read back on every request rather than carried by the token',
      () =>
        Effect.gen(function* () {
          yield* seed;
          const sql = yield* SqlClient.SqlClient;
          const administrators = yield* Administrators;
          const session = yield* AdminSession;

          const account = yield* administrators.authenticate(
            'alice',
            'bon-mot-de-passe',
          );
          const token = yield* session.open(account);

          yield* sql`UPDATE fos_user SET enabled = 0 WHERE id = 1`;

          assert.isNull(yield* session.read(token));
        }),
    );

    it.effect(
      'does not recognise a well formed HS256 token signed with another secret',
      () =>
        Effect.gen(function* () {
          yield* seed;
          const session = yield* AdminSession;

          const forged =
            'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.' +
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

          assert.isNull(yield* session.read(forged));
        }),
    );
  });
});

describe('hierarchy of the roles', () => {
  itSimple('unfolds ROLE_SUPER_ADMIN down to ROLE_USER', () => {
    expect([...effectiveRoles(['ROLE_SUPER_ADMIN'])].sort()).toEqual([
      'ROLE_ADMIN',
      'ROLE_SUPER_ADMIN',
      'ROLE_USER',
    ]);
  });

  itSimple('unfolds ROLE_ADMIN down to ROLE_USER', () => {
    expect([...effectiveRoles(['ROLE_ADMIN'])].sort()).toEqual([
      'ROLE_ADMIN',
      'ROLE_USER',
    ]);
  });

  itSimple('recognises a role obtained through the hierarchy', () => {
    const chief = {
      id: 3,
      username: 'Chef',
      email: 'chef@exemple.fr',
      roles: ['ROLE_SUPER_ADMIN'],
    };

    expect(hasRole(chief, 'ROLE_ADMIN')).toBe(true);
    expect(hasRole(chief, 'ROLE_USER')).toBe(true);
  });

  itSimple('does not give a role one does not have', () => {
    const plain = {
      id: 9,
      username: 'Simple',
      email: 's@exemple.fr',
      roles: ['ROLE_USER'],
    };

    expect(hasRole(plain, 'ROLE_ADMIN')).toBe(false);
  });
});
