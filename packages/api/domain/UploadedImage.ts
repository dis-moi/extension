import type { FilterName } from './Thumbnail';

// config/packages/vich_uploader.yaml of the PHP backend.
export const IMAGE_DIRECTORIES = {
  imageFile: 'avatars',
  bannerImageFile: 'contributor_banners',
  previewImageFile: 'contributor_previews',
  screenshotFile: 'notice_screenshots',
} as const;

export type ImageField = keyof typeof IMAGE_DIRECTORIES;

export const CONTRIBUTOR_FIELDS = [
  'imageFile',
  'bannerImageFile',
  'previewImageFile',
] as const;

export type ContributorImageField = (typeof CONTRIBUTOR_FIELDS)[number];

export const isContributorField = (
  value: string,
): value is ContributorImageField =>
  (CONTRIBUTOR_FIELDS as ReadonlyArray<string>).includes(value);

// Ours, not the PHP's: it relied on the platform default, which production
// set nowhere.
export const MAX_SIZE_BYTES = 5 * 1024 * 1024;

const FIELD_BY_DIRECTORY = new Map<string, ImageField>(
  (Object.keys(IMAGE_DIRECTORIES) as ImageField[]).map((field) => [
    IMAGE_DIRECTORIES[field],
    field,
  ]),
);

const isPlainFileName = (name: string): boolean =>
  name !== '' &&
  name !== '.' &&
  name !== '..' &&
  !name.includes('/') &&
  !name.includes('\\') &&
  !name.includes('\u0000');

export const parseUploadPath = (
  decodedSegments: ReadonlyArray<string>,
): { readonly field: ImageField; readonly fileName: string } | null => {
  if (decodedSegments.length !== 2) return null;

  const [directory, fileName] = decodedSegments as [string, string];
  const field = FIELD_BY_DIRECTORY.get(directory);

  if (field === undefined || !isPlainFileName(fileName)) {
    return null;
  }

  return { field, fileName };
};

export const storagePath = (field: ImageField, fileName: string): string =>
  `uploads/${IMAGE_DIRECTORIES[field]}/${fileName}`;

export const thumbnailStoragePath = (
  filter: FilterName,
  field: ImageField,
  fileName: string,
): string => `media/cache/${filter}/${storagePath(field, fileName)}`;

// Taken from the production database. SVG stays out: an executable document
// served from the origin of the API is a stored script injection.
const SERVED_EXTENSIONS = {
  png: 'png',
  jpg: 'jpeg',
  jpeg: 'jpeg',
  jfif: 'jpeg',
  webp: 'webp',
} as const;

export type ImageFormat =
  (typeof SERVED_EXTENSIONS)[keyof typeof SERVED_EXTENSIONS];

const CONTENT_TYPES: Readonly<Record<ImageFormat, string>> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
};

export const formatOfName = (fileName: string): ImageFormat | null => {
  const dot = fileName.lastIndexOf('.');
  if (dot <= 0) return null;

  const suffix = fileName.slice(dot + 1).toLowerCase();

  return SERVED_EXTENSIONS[suffix as keyof typeof SERVED_EXTENSIONS] ?? null;
};

export const contentType = (fileName: string): string | null => {
  const format = formatOfName(fileName);
  return format === null ? null : CONTENT_TYPES[format];
};

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;
const JPEG_SIGNATURE = [0xff, 0xd8, 0xff] as const;

const startsWith = (
  bytes: Uint8Array,
  signature: ReadonlyArray<number>,
): boolean =>
  bytes.length >= signature.length &&
  signature.every((expected, rank) => bytes[rank] === expected);

const asciiWord = (bytes: Uint8Array, from: number, word: string): boolean =>
  bytes.length >= from + word.length &&
  [...word].every(
    (character, rank) => bytes[from + rank] === character.charCodeAt(0),
  );

// Only the real header opens the store: an announced extension would let an
// executable document in under the name of an image.
export const formatOfBytes = (bytes: Uint8Array): ImageFormat | null => {
  if (startsWith(bytes, PNG_SIGNATURE)) return 'png';
  if (startsWith(bytes, JPEG_SIGNATURE)) return 'jpeg';
  if (asciiWord(bytes, 0, 'RIFF') && asciiWord(bytes, 8, 'WEBP')) return 'webp';

  return null;
};

const WRITTEN_EXTENSIONS: Readonly<Record<ImageFormat, string>> = {
  png: 'png',
  jpeg: 'jpg',
  webp: 'webp',
};

export const extensionOfFormat = (format: ImageFormat): string =>
  WRITTEN_EXTENSIONS[format];

// The VichFilenamer trait of the PHP backend, which the stored names
// follow. The 62 letters do not divide 256, so the first eight come up 1.6%
// more often; over 32 characters that still leaves 190 bits.
const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const NAME_BYTES = 32;

export const randomName = (draw: Uint8Array): string => {
  if (draw.length !== NAME_BYTES) {
    throw new RangeError(`The draw must hold ${NAME_BYTES} bytes.`);
  }

  return Array.from(
    draw,
    (byte) => ALPHABET[byte % ALPHABET.length] as string,
  ).join('');
};

const withExtension = (base: string, format: ImageFormat): string =>
  `${base}.${extensionOfFormat(format)}`;

export const contributorFileName = (
  random: string,
  format: ImageFormat,
): string => withExtension(random, format);

export const noticeFileName = (noticeId: number, format: ImageFormat): string =>
  withExtension(String(noticeId), format);
