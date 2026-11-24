import { Schema } from 'effect';
import { Visibility } from './NoticeVisibility';
import { isFilled, type Violation, violationsOf } from './validation';

// The counter the former admin displayed under the field.
const MESSAGE_MAX = 500;

// The extension runs these patterns in the browser: an invalid one does not
// break the API, it breaks the display for the people reading the notice.
const isCompilableRegExp = (message: string) =>
  Schema.makeFilter<string>(
    (value) => {
      try {
        new RegExp(value);
        return true;
      } catch {
        return false;
      }
    },
    { message },
  );

const ContextSubmission = Schema.Struct({
  urlRegex: Schema.String.pipe(
    Schema.check(
      isFilled('le motif de chemin est vide.'),
      isCompilableRegExp('le motif de chemin est invalide.'),
    ),
  ),
  excludeUrlRegex: Schema.NullOr(
    Schema.String.pipe(
      Schema.check(isCompilableRegExp('le motif d’exclusion est invalide.')),
    ),
  ),
});

const NoticeSubmission = Schema.Struct({
  message: Schema.String.pipe(
    Schema.check(
      isFilled('Le message ne peut pas être vide.'),
      Schema.isMaxLength(MESSAGE_MAX, {
        message: `Le message dépasse ${MESSAGE_MAX} caractères.`,
      }),
    ),
  ),
  visibility: Visibility.annotate({ message: 'Visibilité inconnue.' }),
  excludeUrlRegex: Schema.NullOr(
    Schema.String.pipe(
      Schema.check(
        isCompilableRegExp(
          'Le motif d’exclusion de la notice n’est pas valide.',
        ),
      ),
    ),
  ),
  contextes: Schema.Array(ContextSubmission).pipe(
    Schema.check(
      Schema.isNonEmpty({
        message: 'Une notice a besoin d’au moins un contexte de ciblage.',
      }),
    ),
  ),
});

const withContextRank = (violation: Violation): string => {
  const [field, rank] = violation.path;

  return field === 'contextes' && typeof rank === 'number'
    ? `Contexte ${rank + 1} : ${violation.message}`
    : violation.message;
};

export const noticeViolations = (submission: unknown): ReadonlyArray<string> =>
  violationsOf(NoticeSubmission)(submission).map(withContextRank);
