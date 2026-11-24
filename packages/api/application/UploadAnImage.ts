import { Effect, Schema } from 'effect';
import {
  contributorFileName,
  formatOfBytes,
  type ImageField,
  type ImageFormat,
  MAX_SIZE_BYTES,
  NAME_BYTES,
  noticeFileName,
  randomName,
  storagePath,
  type ContributorImageField,
} from '../domain/UploadedImage';
import { Files } from './Files';
import { Moderation } from './Moderation';
import { Randomness } from './Randomness';

export class ImageRefused extends Schema.TaggedError<ImageRefused>()(
  'ImageRefused',
  { reason: Schema.String },
) {}

const megabytes = (bytes: number): string => (bytes / (1024 * 1024)).toFixed(0);

const SCREENSHOT = 'screenshotFile' as const;

const formatAccepted = (
  content: Uint8Array,
): Effect.Effect<ImageFormat, ImageRefused> =>
  Effect.gen(function* () {
    if (content.length > MAX_SIZE_BYTES) {
      return yield* new ImageRefused({
        reason: `L’image dépasse ${megabytes(MAX_SIZE_BYTES)} Mo.`,
      });
    }

    const format = formatOfBytes(content);
    if (format === null) {
      return yield* new ImageRefused({
        reason: 'Seuls les fichiers PNG, JPEG et WebP sont acceptés.',
      });
    }

    return format;
  });

// What delete_on_update did in Vich. The failure does not propagate: the new
// image is in place, and an orphan in the store does not justify declaring
// the upload failed. A name the new file reuses is left alone, since
// removing it would delete what has just been written.
const forgetReplaced = (
  field: ImageField,
  previous: string | null,
  written: string | null,
) =>
  previous === null || previous === written
    ? Effect.void
    : Effect.gen(function* () {
        yield* (yield* Files).remove(storagePath(field, previous)).pipe(
          Effect.tapError((failure) =>
            Effect.logWarning('Replaced image not removed', { failure }),
          ),
          Effect.ignore,
        );
      });

// The file is written before the database row: a row without a file would
// show a broken image, a file without a row only costs an orphan in the
// store.
export const uploadContributorImage = (
  id: number,
  field: ContributorImageField,
  content: Uint8Array,
) =>
  Effect.gen(function* () {
    const format = yield* formatAccepted(content);

    const draw = yield* (yield* Randomness).bytes(NAME_BYTES);
    const fileName = contributorFileName(randomName(draw), format);

    yield* (yield* Files).write(storagePath(field, fileName), content);

    const previous = yield* (yield* Moderation).saveContributorImage(
      id,
      field,
      fileName,
    );

    yield* forgetReplaced(field, previous, fileName);

    return fileName;
  });

// The screenshot is named after the notice, as the PropertyNamer of Vich
// named it: 80 of the 115 files production holds carry that name, and a
// second convention would make the older ones unreadable to no end.
export const uploadNoticeScreenshot = (id: number, content: Uint8Array) =>
  Effect.gen(function* () {
    const format = yield* formatAccepted(content);
    const fileName = noticeFileName(id, format);

    yield* (yield* Files).write(storagePath(SCREENSHOT, fileName), content);

    const previous = yield* (yield* Moderation).saveNoticeScreenshot(
      id,
      fileName,
    );

    yield* forgetReplaced(SCREENSHOT, previous, fileName);

    return fileName;
  });

export const removeNoticeScreenshot = (id: number) =>
  Effect.gen(function* () {
    const previous = yield* (yield* Moderation).saveNoticeScreenshot(id, null);

    yield* forgetReplaced(SCREENSHOT, previous, null);
  });
