import { Result, Schema, SchemaIssue } from 'effect';

const standardIssues = SchemaIssue.makeFormatterStandardSchemaV1();

export const isFilled = (message: string) =>
  Schema.makeFilter<string>((value) => value.trim().length > 0, { message });

// The extension runs these patterns in the browser: an invalid one does not
// break the API, it breaks the display for the people reading the notice.
export const isCompilableRegExp = (message: string) =>
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

export interface Violation {
  readonly path: ReadonlyArray<PropertyKey>;
  readonly message: string;
}

const asKey = (segment: unknown): PropertyKey =>
  typeof segment === 'object' && segment !== null && 'key' in segment
    ? (segment.key as PropertyKey)
    : (segment as PropertyKey);

// `errors: 'all'` rather than the default: a form that reveals one broken rule
// per submission makes the person guess the rest.
export const violationsOf =
  <T, E>(schema: Schema.Codec<T, E>) =>
  (input: unknown): ReadonlyArray<Violation> => {
    const decoded = Schema.decodeUnknownResult(schema)(input, {
      errors: 'all',
    });

    if (Result.isSuccess(decoded)) return [];

    return standardIssues(decoded.failure.issue).issues.map((issue) => ({
      path: (issue.path ?? []).map(asKey),
      message: issue.message,
    }));
  };
