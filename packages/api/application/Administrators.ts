import { Context, type Effect, Schema } from 'effect';
import { InvalidFields } from './InvalidFields';

// The accounts live in fos_user, the FOSUserBundle table, which is left
// untouched: the 26 existing accounts keep their passwords, bcrypt at cost
// 13. Only what verifies them changes.

export class InvalidCredentials extends Schema.TaggedError<InvalidCredentials>()(
  'InvalidCredentials',
  {},
) {}

export class AccountMissing extends Schema.TaggedError<AccountMissing>()(
  'AccountMissing',
  { id: Schema.Number },
) {}

// username_canonical and email_canonical carry a unique index: without this
// the insert comes back as a defect rather than as something to correct.
export class LoginTaken extends Schema.TaggedError<LoginTaken>()('LoginTaken', {
  login: Schema.String,
}) {}

export interface SubmittedAccount {
  readonly username: string;
  readonly email: string;
  readonly roles: ReadonlyArray<string>;
  readonly enabled: boolean;
}

// config/packages/security.yaml.
const IMPLIES: Record<string, ReadonlyArray<string>> = {
  ROLE_SUPER_ADMIN: ['ROLE_ADMIN', 'ROLE_USER'],
  ROLE_ADMIN: ['ROLE_USER'],
};

export const effectiveRoles = (
  roles: ReadonlyArray<string>,
): ReadonlySet<string> => {
  const all = new Set(roles);
  for (const role of roles) {
    for (const implied of IMPLIES[role] ?? []) all.add(implied);
  }
  return all;
};

export interface Administrator {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly roles: ReadonlyArray<string>;
}

export interface AccountRow {
  readonly id: number;
  readonly username: string;
  readonly email: string;
  readonly roles: ReadonlyArray<string>;
  readonly enabled: boolean;
  // An enabled account with no usable hash fails to sign in without
  // explaining anything; saying so saves the hunt for why.
  readonly canSignIn: boolean;
  readonly lastSignIn: string | null;
}

export const hasRole = (administrator: Administrator, role: string): boolean =>
  effectiveRoles(administrator.roles).has(role);

export class Administrators extends Context.Service<
  Administrators,
  {
    authenticate(
      login: string,
      password: string,
    ): Effect.Effect<Administrator, InvalidCredentials>;

    // null rather than an error: an account deleted or disabled between two
    // requests is not an anomaly, it is a sign-out.
    byId(id: number): Effect.Effect<Administrator | null>;

    // Hashes never cross this port: they have no reason to exist outside
    // authenticate, where they are compared.
    readonly all: Effect.Effect<ReadonlyArray<AccountRow>>;

    setEnabled(
      id: number,
      enabled: boolean,
    ): Effect.Effect<void, AccountMissing>;

    // The password travels apart from the rest: it is never read back, so
    // editing an account must not require retyping it, and setting it must
    // not require touching anything else.
    createAccount(
      submitted: SubmittedAccount,
      password: string,
    ): Effect.Effect<number, InvalidFields | LoginTaken>;

    saveAccount(
      id: number,
      submitted: SubmittedAccount,
    ): Effect.Effect<void, InvalidFields | AccountMissing | LoginTaken>;

    setPassword(
      id: number,
      password: string,
    ): Effect.Effect<void, InvalidFields | AccountMissing>;
  }
>()('api/application/Administrators') {}
