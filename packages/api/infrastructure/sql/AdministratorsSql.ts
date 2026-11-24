import bcrypt from 'bcryptjs';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import {
  type Administrator,
  Administrators,
  AccountMissing,
  InvalidCredentials,
  type AccountRow,
} from '../../application/Administrators';
import { readStringArray } from '../../domain/PhpSerialise';

// Nothing is migrated: the passwords stay the ones FOSUserBundle wrote,
// bcrypt at cost 13 with the $2y$ prefix. Checked: bcryptjs accepts that
// prefix, which only names the PHP variant of the same algorithm.

// A real cost-13 hash of a random string nobody holds, so that comparing
// against it costs exactly what comparing against a stored hash costs. A
// malformed hash would be rejected before any key derivation and answer in no
// time at all, which is the enumeration oracle this stands in the way of.
const DECOY_HASH =
  '$2y$13$BOM5FFTcSdZSjzWkJNinZOw42VUYsd4pFFH.M6dcciXDSa0bm5RxK';

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
    });
  }),
);
