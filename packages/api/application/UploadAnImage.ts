import { Effect, Schema } from 'effect';
import {
  contributorFileName,
  formatOfBytes,
  MAX_SIZE_BYTES,
  NAME_BYTES,
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

// The file is written before the database row: a row without a file would
// show a broken image, a file without a row only costs an orphan in the
// store.
export const uploadContributorImage = (
  id: number,
  field: ContributorImageField,
  content: Uint8Array,
) =>
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

    const draw = yield* (yield* Randomness).bytes(NAME_BYTES);
    const fileName = contributorFileName(randomName(draw), format);

    yield* (yield* Files).write(storagePath(field, fileName), content);

    const previous = yield* (yield* Moderation).saveContributorImage(
      id,
      field,
      fileName,
    );

    // What delete_on_update did in Vich. The failure does not propagate: the
    // new image is in place, and an orphan in the store does not justify
    // declaring the upload failed.
    if (previous !== null && previous !== fileName) {
      yield* (yield* Files).remove(storagePath(field, previous)).pipe(
        Effect.tapError((failure) =>
          Effect.logWarning('Replaced image not removed', { failure }),
        ),
        Effect.ignore,
      );
    }

    return fileName;
  });
