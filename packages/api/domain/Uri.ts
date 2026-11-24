// Reproduces UriModifier::mergeQuery of League\Uri, which the PHP backend
// applies to every link of a message. The splitting is done by hand rather
// than with URL, which normalises too much: it would add a / path to
// http://societe.com, which production serves without a trailing slash.

const codes = (characters: string): ReadonlySet<number> =>
  new Set([...characters].map((character) => character.charCodeAt(0)));

const ALPHANUMERIC =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const LEGAL = codes(`${ALPHANUMERIC}-._~!$&'()*+,;=:@/?`);

// LEGAL minus the single &, which separates the pairs of the query and so
// stays encoded where %3D decodes.
const DECODABLE = codes(`${ALPHANUMERIC}-._~!$'()*+,;=:@/?`);

const encoder = new TextEncoder();

const percentEncoded = (character: string): string =>
  Array.from(encoder.encode(character))
    .map((byte) => `%${byte.toString(16).toUpperCase().padStart(2, '0')}`)
    .join('');

// RFC 3986: with no scheme and no authority, a decoded colon in the first
// segment would make that segment read as a scheme name.
const COLON = ':'.charCodeAt(0);

export const normaliseComponent = (
  component: string,
  relativeFirstSegment = false,
): string => {
  let output = '';
  let i = 0;
  let stillInFirstSegment = relativeFirstSegment;

  while (i < component.length) {
    const hex = component.slice(i + 1, i + 3);
    if (component[i] === '%' && /^[0-9a-fA-F]{2}$/.test(hex)) {
      const byte = Number.parseInt(hex, 16);
      const decodable =
        DECODABLE.has(byte) && !(stillInFirstSegment && byte === COLON);

      // The case of a kept sequence is left alone: production serves
      // %e2%98%95 in lower case where the source wrote it that way.
      output += decodable ? String.fromCodePoint(byte) : `%${hex}`;
      i += 3;
      continue;
    }

    if (component[i] === '/') stillInFirstSegment = false;

    const point = component.codePointAt(i);
    const character =
      point === undefined ? component[i]! : String.fromCodePoint(point);

    // Non-ASCII stays as is: production serves /Melvita+Opéra/ with its
    // accent, not as %C3%A9.
    const code = character.charCodeAt(0);
    output +=
      code > 127 || LEGAL.has(code) ? character : percentEncoded(character);
    i += character.length;
  }

  return output;
};

export const normaliseHost = (host: string): string => {
  const lowercase = host.toLowerCase();

  if (!/[^\u0000-\u007f]/.test(lowercase)) return lowercase;

  try {
    return new URL(`http://${lowercase}`).host;
  } catch {
    return lowercase;
  }
};

const split = (
  text: string,
  separator: string,
): [string, string | undefined] => {
  const i = text.indexOf(separator);
  return i === -1
    ? [text, undefined]
    : [text.slice(0, i), text.slice(i + separator.length)];
};

interface Parts {
  readonly scheme: string;
  readonly host: string;
  readonly pathAndQuery: string;
  readonly fragment: string | undefined;
}

// Without //, everything before the first / or ? is a relative path, which
// must not be lowercased: production serves href="Peopeo?…" with its capital.
const AUTHORITY = /^(https?:)?\/\//i;

const parts = (url: string): Parts => {
  const [beforeFragment, fragment] = split(url.trim(), '#');

  const authority = AUTHORITY.exec(beforeFragment);
  if (authority === null) {
    return {
      scheme: '',
      host: '',
      pathAndQuery: beforeFragment,
      fragment,
    };
  }

  const scheme = authority[0];
  const afterScheme = beforeFragment.slice(scheme.length);

  const hostEnd = afterScheme.search(/[/?]/);
  return hostEnd === -1
    ? { scheme, host: afterScheme, pathAndQuery: '', fragment }
    : {
        scheme,
        host: afterScheme.slice(0, hostEnd),
        pathAndQuery: afterScheme.slice(hostEnd),
        fragment,
      };
};

export const mergeQueryParameter = (
  url: string,
  key: string,
  value: string,
): string => {
  const { scheme, host, pathAndQuery, fragment } = parts(url);
  const [path, query] = split(pathAndQuery, '?');

  const wanted = `${key}=${value}`;
  const kept: string[] = [];
  let replaced = false;

  for (const pair of query === undefined || query === ''
    ? []
    : query.split('&')) {
    if (split(pair, '=')[0] !== key) {
      kept.push(normaliseComponent(pair));
    } else if (!replaced) {
      kept.push(wanted);
      replaced = true;
    }
  }

  if (!replaced) kept.push(wanted);

  const relativePath = scheme === '';

  return (
    scheme.toLowerCase() +
    normaliseHost(host) +
    normaliseComponent(path, relativePath) +
    (kept.length > 0 ? `?${kept.join('&')}` : '') +
    (fragment === undefined ? '' : `#${normaliseComponent(fragment)}`)
  );
};
