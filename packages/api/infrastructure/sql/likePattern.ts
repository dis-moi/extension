// A search term is text, not a pattern. Left as is, a `%` typed by hand
// matches every row and an `_` matches any character, so searching `100%`
// scans notice and matching_context whole.
//
// The escape character is the backslash, which is MySQL's default for LIKE:
// no ESCAPE clause is needed, and the backslash itself is escaped first so
// that the ones added next are not doubled.
export const containing = (term: string): string =>
  `%${term.replace(/[\\%_]/g, (character) => `\\${character}`)}%`;
