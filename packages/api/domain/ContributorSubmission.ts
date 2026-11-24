import { Schema } from 'effect';
import { isFilled, violationsOf } from './validation';

// Taken from the Doctrine mapping and the @Assert annotations of
// backend/src/Entity/Contributor.php.
const NAME_MAX = 255;
const TITLE_MAX = 255;
const EMAIL_MAX = 255;
const WEBSITE_MAX = 255;
const INTRO_MAX = 65535;
const LOCALE_MAX = 255;

// Symfony's @Assert\Email in its default `loose` mode, the shape the stored
// addresses were accepted under.
const EMAIL = /^.+@\S+\.\S+$/;

const atMost = (max: number, message: string) =>
  Schema.NullOr(
    Schema.String.pipe(Schema.check(Schema.isMaxLength(max, { message }))),
  );

const ContributorSubmission = Schema.Struct({
  name: Schema.String.pipe(
    Schema.check(
      isFilled('Le nom ne peut pas être vide.'),
      Schema.isMaxLength(NAME_MAX, {
        message: `Le nom dépasse ${NAME_MAX} caractères.`,
      }),
    ),
  ),
  title: atMost(TITLE_MAX, `Le titre dépasse ${TITLE_MAX} caractères.`),
  email: Schema.NullOr(
    Schema.String.pipe(
      Schema.check(
        Schema.isPattern(EMAIL, {
          message: 'L’adresse électronique n’est pas valide.',
        }),
        Schema.isMaxLength(EMAIL_MAX, {
          message: `L’adresse électronique dépasse ${EMAIL_MAX} caractères.`,
        }),
      ),
    ),
  ),
  website: atMost(
    WEBSITE_MAX,
    `Le site web dépasse ${WEBSITE_MAX} caractères.`,
  ),
  intro: atMost(INTRO_MAX, `La présentation dépasse ${INTRO_MAX} caractères.`),
  locale: atMost(LOCALE_MAX, `La langue dépasse ${LOCALE_MAX} caractères.`),
});

export const contributorViolations = (
  submission: unknown,
): ReadonlyArray<string> =>
  violationsOf(ContributorSubmission)(submission).map(
    (violation) => violation.message,
  );
