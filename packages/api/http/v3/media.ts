import { IMAGE_DIRECTORIES, type ImageField } from '../../domain/UploadedImage';

// These addresses are persisted in the chrome.storage.sync of installed
// extensions: their shape cannot change.

export const UPLOAD_PREFIXES = Object.fromEntries(
  (Object.keys(IMAGE_DIRECTORIES) as ImageField[]).map((field) => [
    field,
    `/uploads/${IMAGE_DIRECTORIES[field]}`,
  ]),
) as Readonly<Record<ImageField, string>>;

// The order is the one in which ContributorNormalizer adds them, hence the
// order of the JSON keys.
export const THUMBNAILS = [
  { name: 'small', filter: 's_thumb' },
  { name: 'normal', filter: 'm_thumb' },
  { name: 'large', filter: 'l_thumb' },
  { name: 'extra_large', filter: 'xl_thumb' },
] as const;

export const uploadPath = (field: ImageField, fileName: string): string =>
  `${UPLOAD_PREFIXES[field]}/${encodeURIComponent(fileName)}`;

export const uploadUrl = (
  origin: string,
  field: ImageField,
  fileName: string | null,
): string | null =>
  fileName === null || fileName === ''
    ? null
    : origin + uploadPath(field, fileName);

export const thumbnailUrl = (
  origin: string,
  filter: string,
  field: ImageField,
  fileName: string,
): string => `${origin}/media/cache/${filter}${uploadPath(field, fileName)}`;

export const avatar = (
  origin: string,
  image: string | null,
): Record<string, { url: string }> | null => {
  if (image === null || image === '') return null;

  const urls: Record<string, { url: string }> = {};
  for (const { name, filter } of THUMBNAILS) {
    urls[name] = { url: thumbnailUrl(origin, filter, 'imageFile', image) };
  }
  return urls;
};
