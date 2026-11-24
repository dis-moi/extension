// Next gives string | string[] | undefined: a repeated parameter arrives as
// an array, and the filters expect a single value.

export type Parameters = Record<string, string | string[] | undefined>;

export const parameter = (
  parameters: Parameters,
  key: string,
): string | undefined => {
  const value = parameters[key];
  return Array.isArray(value) ? value[0] : value;
};

export const textParameter = (parameters: Parameters, key: string): string =>
  parameter(parameters, key) ?? '';

// Number('abc') gives NaN and Number('') gives 0: both must fall back to the
// default rather than produce an empty page or a page zero.
export const integerParameter = (
  parameters: Parameters,
  key: string,
  fallback: number,
): number => {
  const value = Number(parameter(parameters, key));
  return Number.isInteger(value) && value > 0 ? value : fallback;
};

// Empty values are left out: an address carries the active filters, not the
// boxes left at their default.
export const address = (
  path: string,
  parameters: Record<string, string | undefined>,
  changes: Record<string, string | undefined> = {},
): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries({
    ...parameters,
    ...changes,
  })) {
    if (value !== undefined && value !== '') query.set(key, value);
  }

  const encoded = query.toString();
  return encoded === '' ? path : `${path}?${encoded}`;
};
