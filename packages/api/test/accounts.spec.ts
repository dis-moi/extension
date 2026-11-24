process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';

import { assert, layer } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  Administrators,
  type SubmittedAccount,
} from '../application/Administrators';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { AdministratorsSqlLive } from '../infrastructure/sql/AdministratorsSql';

const TestLayer = AdministratorsSqlLive.pipe(Layer.provideMerge(DatabaseLive));

const PASSWORD = 'un-mot-de-passe-tenable';

const account = (over: Partial<SubmittedAccount> = {}): SubmittedAccount => ({
  username: 'essai-claire',
  email: 'claire@essai.test',
  roles: ['ROLE_ADMIN'],
  enabled: true,
  ...over,
});

const wipe = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;
  yield* sql`DELETE FROM fos_user WHERE username_canonical LIKE 'essai-%'`;
});

const rowOf = (id: number) =>
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;
    const rows = yield* sql<{
      username: string;
      username_canonical: string;
      email_canonical: string;
      enabled: number;
      roles: string;
      password: string;
      salt: string | null;
    }>`
      SELECT username, username_canonical, email_canonical, enabled, roles,
             password, salt
        FROM fos_user WHERE id = ${id}
    `;
    return rows[0];
  });

layer(TestLayer)('an account created from the administration', (it) => {
  it.effect('writes the canonical columns the provider queries on', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const id = yield* administrators.createAccount(
        account({ username: 'Essai-Claire', email: 'Claire@Essai.TEST' }),
        PASSWORD,
      );

      const row = yield* rowOf(id);

      assert.strictEqual(row?.username, 'Essai-Claire');
      assert.strictEqual(row?.username_canonical, 'essai-claire');
      assert.strictEqual(row?.email_canonical, 'claire@essai.test');
    }),
  );

  it.effect('writes the roles in the shape FOSUserBundle wrote', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const id = yield* administrators.createAccount(
        account({ roles: ['ROLE_ADMIN'] }),
        PASSWORD,
      );

      assert.strictEqual(
        (yield* rowOf(id))?.roles,
        'a:1:{i:0;s:10:"ROLE_ADMIN";}',
      );
    }),
  );

  it.effect('hashes the password with the prefix of the PHP variant', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const id = yield* administrators.createAccount(account(), PASSWORD);
      const row = yield* rowOf(id);

      assert.match(row?.password ?? '', /^\$2y\$13\$/);
      assert.isNull(row?.salt ?? null);
    }),
  );

  it.effect('lets the new account sign in straight away', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      yield* administrators.createAccount(account(), PASSWORD);
      const signed = yield* administrators.authenticate(
        'essai-claire',
        PASSWORD,
      );

      assert.strictEqual(signed.username, 'essai-claire');
      assert.deepStrictEqual([...signed.roles], ['ROLE_ADMIN']);
    }),
  );

  it.effect('refuses a login another account already carries', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      yield* administrators.createAccount(account(), PASSWORD);

      const refusal = yield* administrators
        .createAccount(account({ email: 'ailleurs@essai.test' }), PASSWORD)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'LoginTaken');
    }),
  );

  it.effect('refuses an address another account already carries', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      yield* administrators.createAccount(account(), PASSWORD);

      const refusal = yield* administrators
        .createAccount(account({ username: 'essai-autre' }), PASSWORD)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'LoginTaken');
    }),
  );

  it.effect('refuses a password of eleven characters', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const refusal = yield* administrators
        .createAccount(account(), '12345678901')
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('refuses an account with no role', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const refusal = yield* administrators
        .createAccount(account({ roles: [] }), PASSWORD)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );
});

layer(TestLayer)('an account edited from the administration', (it) => {
  const created = Effect.gen(function* () {
    yield* wipe;
    const administrators = yield* Administrators;
    return yield* administrators.createAccount(account(), PASSWORD);
  });

  it.effect('changes the address and the roles together', () =>
    Effect.gen(function* () {
      const id = yield* created;
      const administrators = yield* Administrators;

      yield* administrators.saveAccount(
        id,
        account({
          email: 'claire.autre@essai.test',
          roles: ['ROLE_USER', 'ROLE_ADMIN'],
        }),
      );

      const row = yield* rowOf(id);

      assert.strictEqual(row?.email_canonical, 'claire.autre@essai.test');
      assert.strictEqual(
        row?.roles,
        'a:2:{i:0;s:9:"ROLE_USER";i:1;s:10:"ROLE_ADMIN";}',
      );
    }),
  );

  it.effect('leaves the password alone', () =>
    Effect.gen(function* () {
      const id = yield* created;
      const administrators = yield* Administrators;

      const before = (yield* rowOf(id))?.password;
      yield* administrators.saveAccount(id, account({ enabled: false }));

      assert.strictEqual((yield* rowOf(id))?.password, before);
    }),
  );

  it.effect('lets an account keep its own login', () =>
    Effect.gen(function* () {
      const id = yield* created;
      const administrators = yield* Administrators;

      yield* administrators.saveAccount(id, account({ enabled: false }));

      assert.strictEqual((yield* rowOf(id))?.enabled, 0);
    }),
  );

  it.effect('refuses to edit an account that does not exist', () =>
    Effect.gen(function* () {
      yield* wipe;
      const administrators = yield* Administrators;

      const refusal = yield* administrators
        .saveAccount(424242, account())
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'AccountMissing');
    }),
  );

  it.effect('replaces the password without touching anything else', () =>
    Effect.gen(function* () {
      const id = yield* created;
      const administrators = yield* Administrators;

      yield* administrators.setPassword(id, 'un-autre-mot-de-passe');

      const refusal = yield* administrators
        .authenticate('essai-claire', PASSWORD)
        .pipe(Effect.flip);
      assert.strictEqual(refusal._tag, 'InvalidCredentials');

      const signed = yield* administrators.authenticate(
        'essai-claire',
        'un-autre-mot-de-passe',
      );
      assert.strictEqual(signed.id, id);
    }),
  );

  it.effect('refuses a password that is too short', () =>
    Effect.gen(function* () {
      const id = yield* created;
      const administrators = yield* Administrators;

      const refusal = yield* administrators
        .setPassword(id, 'court')
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );
});
