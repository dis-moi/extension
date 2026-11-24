import bcrypt from 'bcryptjs';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  type Administrator,
  Administrators,
  AccountMissing,
  InvalidCredentials,
  LoginTaken,
  type AccountRow,
  type SubmittedAccount,
} from '../../application/Administrators';
import { InvalidFields } from '../../application/InvalidFields';
import {
  accountViolations,
  canonical,
  passwordViolations,
} from '../../domain/AccountSubmission';
import { readStringArray, writeStringArray } from '../../domain/PhpSerialise';

// Nothing is migrated: the passwords stay the ones FOSUserBundle wrote,
// bcrypt at cost 13 with the $2y$ prefix. Checked: bcryptjs accepts that
// prefix, which only names the PHP variant of the same algorithm.

// A real cost-13 hash of a random string nobody holds, so that comparing
// against it costs exactly what comparing against a stored hash costs. A
// malformed hash would be rejected before any key derivation and answer in no
// time at all, which is the enumeration oracle this stands in the way of.
const DECOY_HASH =
  '$2y$13$BOM5FFTcSdZSjzWkJNinZOw42VUYsd4pFFH.M6dcciXDSa0bm5RxK';

const BCRYPT_COST = 13;

interface UserRow {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly enabled: number;
  readonly password: string;
  readonly roles: string;
}

const toAdministrator = (row: UserRow): Administrator => ({
  id: row.id,
  username: row.username,
  email: row.email,
  roles: readStringArray(row.roles),
});

export const AdministratorsSqlLive = Layer.effect(
  Administrators,
  Effect.gen(function* () {
    const sql = yield* SqlClient.SqlClient;

    const columns = sql.literal(
      'u.id, u.username, u.email, u.enabled, u.password, u.roles',
    );

    // The same recipe as bin/admin-password.mjs: cost 13, and the $2y$
    // prefix FOSUserBundle wrote, so the PHP backend keeps accepting the
    // password for as long as the two coexist.
    const hashed = (password: string) =>
      Effect.promise(() => bcrypt.hash(password, BCRYPT_COST)).pipe(
        Effect.map((hash) => hash.replace(/^\$2[aby]\$/, '$2y$')),
      );

    // Both canonical columns carry a unique index, and the one already held
    // is what the form has to be told.
    const loginTaken = (submitted: SubmittedAccount, exceptId: number | null) =>
      Effect.gen(function* () {
        const rows = yield* sql<{
          id: number;
          username: string;
          email: string;
        }>`
          SELECT u.id, u.username_canonical AS username,
                 u.email_canonical AS email
            FROM fos_user u
           WHERE u.username_canonical = ${canonical(submitted.username)}
              OR u.email_canonical = ${canonical(submitted.email)}
        `;

        const clash = rows.find((row) => row.id !== exceptId);
        if (clash === undefined) return null;

        return clash.username === canonical(submitted.username)
          ? submitted.username.trim()
          : submitted.email.trim();
      }).pipe(Effect.orDie);

    return Administrators.of({
      authenticate: Effect.fn('Administrators.authenticate')(function* (
        login: string,
        password: string,
      ) {
        // FOSUserBundle stores a lowercase canonical form, and that is what
        // the provider queries — by name or by address.
        const canonical = login.trim().toLowerCase();

        const rows = yield* sql<UserRow>`
          SELECT ${columns}
            FROM fos_user u
           WHERE u.username_canonical = ${canonical}
              OR u.email_canonical = ${canonical}
        `.pipe(Effect.orDie);

        const row = rows[0];

        // Compared even when no account matches: otherwise an unknown login
        // would answer faster than a wrong password, and that gap is enough to
        // enumerate the accounts.
        const hash = row?.password ?? DECOY_HASH;

        const valid = yield* Effect.tryPromise({
          try: () => bcrypt.compare(password, hash),
          // An unreadable hash is not a successful authentication.
          catch: () => new InvalidCredentials(),
        }).pipe(Effect.orElseSucceed(() => false));

        if (row === undefined || !valid || row.enabled !== 1) {
          return yield* new InvalidCredentials();
        }

        yield* sql`
          UPDATE fos_user SET last_login = NOW() WHERE id = ${row.id}
        `.pipe(Effect.orDie);

        return toAdministrator(row);
      }),

      byId: Effect.fn('Administrators.byId')(function* (id: number) {
        const rows = yield* sql<UserRow>`
          SELECT ${columns} FROM fos_user u WHERE u.id = ${id} AND u.enabled = 1
        `;

        const row = rows[0];
        return row === undefined ? null : toAdministrator(row);
      }, Effect.orDie),

      all: Effect.gen(function* () {
        const rows = yield* sql<{
          id: number;
          username: string;
          email: string;
          roles: string;
          enabled: number;
          password: string | null;
          last_login: string | null;
        }>`
          SELECT u.id, u.username, u.email, u.roles, u.enabled, u.password,
                 u.last_login
            FROM fos_user u
           ORDER BY u.username
        `;

        return rows.map((row): AccountRow => {
          // Everything else — empty, inherited from another algorithm, set
          // by hand — cannot sign in.
          const hash = row.password ?? '';

          return {
            id: row.id,
            username: row.username,
            email: row.email,
            roles: readStringArray(row.roles),
            enabled: row.enabled === 1,
            canSignIn:
              row.enabled === 1 && /^\$2[aby]?\$\d{2}\$.{53}$/.test(hash),
            lastSignIn: row.last_login,
          };
        });
      }).pipe(Effect.orDie),

      setEnabled: Effect.fn('Administrators.setEnabled')(function* (
        id: number,
        enabled: boolean,
      ) {
        const rows = yield* sql<{ id: number }>`
            SELECT u.id FROM fos_user u WHERE u.id = ${id}
          `.pipe(Effect.orDie);

        if (rows[0] === undefined) return yield* new AccountMissing({ id });

        yield* sql`
            UPDATE fos_user SET enabled = ${enabled ? 1 : 0} WHERE id = ${id}
          `.pipe(Effect.orDie);
      }),

      createAccount: Effect.fn('Administrators.createAccount')(function* (
        submitted: SubmittedAccount,
        password: string,
      ) {
        const reasons = [
          ...accountViolations(submitted),
          ...passwordViolations(password),
        ];
        if (reasons.length > 0) return yield* new InvalidFields({ reasons });

        const login = yield* loginTaken(submitted, null);
        if (login !== null) return yield* new LoginTaken({ login });

        const hash = yield* hashed(password);

        yield* sql`
          INSERT INTO fos_user
               (username, username_canonical, email, email_canonical,
                enabled, salt, password, roles)
               VALUES (
                 ${submitted.username.trim()},
                 ${canonical(submitted.username)},
                 ${submitted.email.trim()},
                 ${canonical(submitted.email)},
                 ${submitted.enabled ? 1 : 0}, NULL, ${hash},
                 ${writeStringArray(submitted.roles)}
               )
        `.pipe(Effect.orDie);

        const inserted = yield* sql<{ id: number }>`
          SELECT LAST_INSERT_ID() AS id
        `.pipe(Effect.orDie);

        return inserted[0]?.id ?? 0;
      }),

      saveAccount: Effect.fn('Administrators.saveAccount')(function* (
        id: number,
        submitted: SubmittedAccount,
      ) {
        const reasons = accountViolations(submitted);
        if (reasons.length > 0) return yield* new InvalidFields({ reasons });

        const rows = yield* sql<{ id: number }>`
          SELECT u.id FROM fos_user u WHERE u.id = ${id}
        `.pipe(Effect.orDie);

        if (rows[0] === undefined) return yield* new AccountMissing({ id });

        const login = yield* loginTaken(submitted, id);
        if (login !== null) return yield* new LoginTaken({ login });

        yield* sql`
          UPDATE fos_user SET
            username = ${submitted.username.trim()},
            username_canonical = ${canonical(submitted.username)},
            email = ${submitted.email.trim()},
            email_canonical = ${canonical(submitted.email)},
            enabled = ${submitted.enabled ? 1 : 0},
            roles = ${writeStringArray(submitted.roles)}
          WHERE id = ${id}
        `.pipe(Effect.orDie);
      }),

      setPassword: Effect.fn('Administrators.setPassword')(function* (
        id: number,
        password: string,
      ) {
        const reasons = passwordViolations(password);
        if (reasons.length > 0) return yield* new InvalidFields({ reasons });

        const rows = yield* sql<{ id: number }>`
          SELECT u.id FROM fos_user u WHERE u.id = ${id}
        `.pipe(Effect.orDie);

        if (rows[0] === undefined) return yield* new AccountMissing({ id });

        const hash = yield* hashed(password);

        // salt cleared, as bin/admin-password.mjs clears it: bcrypt carries
        // its own, and a leftover salt is what the older algorithm needed.
        yield* sql`
          UPDATE fos_user SET password = ${hash}, salt = NULL WHERE id = ${id}
        `.pipe(Effect.orDie);
      }),
    });
  }),
);
