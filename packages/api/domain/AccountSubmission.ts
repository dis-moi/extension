import { Schema } from 'effect';
import { isFilled, violationsOf } from './validation';

// The roles config/packages/security.yaml declares. The former form only
// offered the first two, which would have silently stripped the one account
// that carries ROLE_SUPER_ADMIN; it is offered here for that reason.
export const ROLES = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'] as const;

export type Role = (typeof ROLES)[number];

export const isRole = (value: string): value is Role =>
  (ROLES as ReadonlyArray<string>).includes(value);

// Symfony's @Assert\Email in its default loose mode, as for a contributor.
const EMAIL = /^.+@\S+\.\S+$/;

const AccountSubmission = Schema.Struct({
  username: Schema.String.pipe(
    Schema.check(isFilled('L’identifiant ne peut pas être vide.')),
  ),
  email: Schema.String.pipe(
    Schema.check(
      Schema.isPattern(EMAIL, {
        message: 'L’adresse électronique n’est pas valide.',
      }),
    ),
  ),
});

const roleViolations = (roles: unknown): ReadonlyArray<string> => {
  if (!Array.isArray(roles)) return [];

  // An account with no role reaches no page: the guard would turn it away
  // after a successful sign-in, which looks like a broken password.
  if (roles.length === 0) return ['Un compte a besoin d’au moins un rôle.'];

  return roles
    .filter((role) => typeof role !== 'string' || !isRole(role))
    .map((role) => `Le rôle « ${String(role)} » n’existe pas.`);
};

export const accountViolations = (
  submission: unknown,
): ReadonlyArray<string> => [
  ...violationsOf(AccountSubmission)(submission).map(
    (violation) => violation.message,
  ),
  ...roleViolations(
    typeof submission === 'object' && submission !== null
      ? (submission as { roles?: unknown }).roles
      : undefined,
  ),
];

// username_canonical and email_canonical, the columns the provider queries.
export const canonical = (value: string): string => value.trim().toLowerCase();

const MINIMUM = 12;

// bcrypt reads 72 bytes and silently drops the rest, so a longer password
// would be accepted with a shorter one.
const MAXIMUM_BYTES = 72;

const encoder = new TextEncoder();

export const passwordViolations = (password: string): ReadonlyArray<string> => {
  if (password.length < MINIMUM) {
    return ['Le mot de passe fait moins de douze caractères.'];
  }

  return encoder.encode(password).length > MAXIMUM_BYTES
    ? [
        `Le mot de passe dépasse ${MAXIMUM_BYTES} octets : bcrypt ignorerait la fin.`,
      ]
    : [];
};
