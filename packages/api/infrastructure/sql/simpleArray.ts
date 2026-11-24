// Doctrine stores a simple_array as comma-separated values, and an empty
// column gives [''] when split naively — that is, a nameless category in the
// payload.
export const simpleArray = (value: string | null): ReadonlyArray<string> =>
  value === null || value === '' ? [] : value.split(',');
