// fos_user.roles is a DC2Type:array, that is, a PHP serialize(). Only that
// one shape is read: a general deserialiser would offer a value coming from
// the database the power to instantiate objects.

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const byteLength = (value: string): number => encoder.encode(value).length;

const refuse = (reason: string, raw: string): never => {
  throw new Error(
    `Unreadable PHP array (${reason}): ${JSON.stringify(raw.slice(0, 80))}`,
  );
};

// Throws on any unexpected shape: returning an empty list would mean "no
// roles", and an account with no roles is indistinguishable from an account
// whose roles could not be read.
export const readStringArray = (raw: string): ReadonlyArray<string> => {
  const header = /^a:(\d+):\{/.exec(raw);
  if (header === null || header[1] === undefined) {
    return refuse('not an array', raw);
  }

  const expected = Number(header[1]);
  const values: string[] = [];
  let i = header[0].length;

  while (i < raw.length && raw[i] !== '}') {
    const key = /^i:(\d+);/.exec(raw.slice(i));
    if (key === null) return refuse('integer key expected', raw.slice(i));
    i += key[0].length;

    const size = /^s:(\d+):"/.exec(raw.slice(i));
    if (size === null || size[1] === undefined) {
      return refuse('string expected', raw.slice(i));
    }
    i += size[0].length;

    const bytes = encoder.encode(raw.slice(i));
    const value = decoder.decode(bytes.slice(0, Number(size[1])));

    if (byteLength(value) !== Number(size[1])) {
      return refuse('announced length wrong', raw.slice(i));
    }

    values.push(value);
    i += value.length;

    if (raw.slice(i, i + 2) !== '";') {
      return refuse('end of string expected', raw.slice(i));
    }
    i += 2;
  }

  if (values.length !== expected) {
    return refuse(`${expected} items announced, ${values.length} read`, raw);
  }

  return values;
};
