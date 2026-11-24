// json_encode of PHP, default options. The body of the V3 responses is
// already in the persistent cache of hundreds of thousands of extensions,
// and two PHP conventions depart from JSON.stringify: every slash is escaped
// (25,494 times in the first 1,000 notices of the corpus), and every
// non-ASCII character is written as lowercase \uXXXX. The rest of the
// escaping is identical, hence the first pass through JSON.stringify.

const NON_ASCII_OU_BARRE = /[\u0080-￿/]/g;

const echapper = (caractere: string): string => {
  if (caractere === '/') return '\\/';

  const point = caractere.charCodeAt(0);
  return `\\u${point.toString(16).padStart(4, '0')}`;
};

// The key order is the insertion order, as in PHP: it is up to the caller to
// build its objects in the order the contract expects. The substitution is
// safe over the whole string: outside of strings, JSON syntax contains
// neither slash nor non-ASCII character.
export const encodePhpJson = (valeur: unknown): string =>
  JSON.stringify(valeur)?.replace(NON_ASCII_OU_BARRE, echapper) ?? 'null';
