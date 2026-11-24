// A server action is an HTTP entry point: everything arriving in its
// FormData comes from the network and can be forged.

export interface SaveResult {
  readonly reasons?: ReadonlyArray<string>;
  readonly saved?: boolean;
}

export const field = (form: FormData, name: string): string =>
  String(form.get(name) ?? '');

// The database tells NULL apart from the empty string: a field left empty
// must land there empty, not as ''.
export const fieldOrNull = (form: FormData, name: string): string | null => {
  const value = field(form, name).trim();
  return value === '' ? null : value;
};

// Unchecked, the field is absent from the FormData.
export const checkbox = (form: FormData, name: string): boolean =>
  form.get(name) !== null;

export const integerOrNull = (form: FormData, name: string): number | null => {
  const raw = fieldOrNull(form, name);
  if (raw === null) return null;

  const value = Number(raw);
  return Number.isInteger(value) ? value : null;
};

export const integers = (form: FormData, name: string): ReadonlyArray<number> =>
  form
    .getAll(name)
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value));

export const integerList = (
  form: FormData,
  name: string,
): ReadonlyArray<number> =>
  field(form, name)
    .split(/[,\s]+/)
    .map((raw) => Number(raw.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);

// A file field left empty arrives all the same, as a File of zero size with
// an empty name.
export const submittedFile = async (
  form: FormData,
  name: string,
): Promise<Uint8Array | null> => {
  const value = form.get(name);
  if (!(value instanceof File) || value.size === 0) return null;

  return new Uint8Array(await value.arrayBuffer());
};

// Commas or spaces: what the former administration accepted, and what one
// pastes out of an address bar.
export const domains = (form: FormData, name: string): ReadonlyArray<string> =>
  field(form, name)
    .split(/[,\s]+/)
    .map((domain) => domain.trim())
    .filter((domain) => domain !== '');
