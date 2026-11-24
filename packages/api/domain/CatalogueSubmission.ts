import { Schema } from 'effect';
import { isCompilableRegExp, isFilled, violationsOf } from './validation';

// The @Assert annotations of backend/src/Entity/DomainName.php,
// DomainsSet.php and RestrictedContext.php, reproduced character for
// character: the stored rows were accepted under them, and a stricter rule
// here would refuse what the catalogue already holds.
const HOST =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

const PATH = /^\/([\w\d]+[-_%.\/\w\d]*)?$/;

const NAME_MAX = 255;
const PATTERN_MAX = 255;

const DomainSubmission = Schema.Struct({
  name: Schema.String.pipe(
    Schema.check(
      Schema.isPattern(HOST, {
        message: 'Le nom de domaine n’est pas valide.',
      }),
      Schema.isMaxLength(NAME_MAX, {
        message: `Le nom de domaine dépasse ${NAME_MAX} caractères.`,
      }),
    ),
  ),
  path: Schema.NullOr(
    Schema.String.pipe(
      Schema.check(
        Schema.isPattern(PATH, {
          message: 'Le chemin doit commencer par une barre oblique.',
        }),
        Schema.isMaxLength(NAME_MAX, {
          message: `Le chemin dépasse ${NAME_MAX} caractères.`,
        }),
      ),
    ),
  ),
});

// Not a schema: the message names the offending alias, which a check over
// the array cannot reach.
const aliasViolations = (aliases: unknown): ReadonlyArray<string> =>
  !Array.isArray(aliases)
    ? []
    : aliases
        .filter((alias) => typeof alias !== 'string' || !HOST.test(alias))
        .map(
          (alias) =>
            `L’alias « ${String(alias)} » n’est pas un nom de domaine valide.`,
        );

export const domainViolations = (
  submission: unknown,
): ReadonlyArray<string> => [
  ...violationsOf(DomainSubmission)(submission).map(
    (violation) => violation.message,
  ),
  ...aliasViolations(
    typeof submission === 'object' && submission !== null
      ? (submission as { aliases?: unknown }).aliases
      : undefined,
  ),
];

// getFullName of the entity, which the former list showed as prettyName.
export const prettyName = (name: string, path: string | null): string =>
  `${name}${path ?? ''}`;

const DomainsSetSubmission = Schema.Struct({
  name: Schema.String.pipe(
    Schema.check(
      isFilled('Le nom du jeu ne peut pas être vide.'),
      Schema.isMaxLength(NAME_MAX, {
        message: `Le nom du jeu dépasse ${NAME_MAX} caractères.`,
      }),
    ),
  ),
});

export const domainsSetViolations = (
  submission: unknown,
): ReadonlyArray<string> =>
  violationsOf(DomainsSetSubmission)(submission).map(
    (violation) => violation.message,
  );

// The legacy only asserted NotBlank. The compilability check is ours: the
// extension compiles these patterns, and one that does not compile makes it
// skip the whole restricted list.
const RestrictedContextSubmission = Schema.Struct({
  urlRegex: Schema.String.pipe(
    Schema.check(
      isFilled('Le motif ne peut pas être vide.'),
      isCompilableRegExp('Le motif n’est pas une expression régulière valide.'),
      Schema.isMaxLength(PATTERN_MAX, {
        message: `Le motif dépasse ${PATTERN_MAX} caractères.`,
      }),
    ),
  ),
});

export const restrictedContextViolations = (
  submission: unknown,
): ReadonlyArray<string> =>
  violationsOf(RestrictedContextSubmission)(submission).map(
    (violation) => violation.message,
  );
