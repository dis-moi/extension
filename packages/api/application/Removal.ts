import { Effect } from 'effect';
import { storagePath } from '../domain/UploadedImage';
import { Files } from './Files';
import { Moderation } from './Moderation';

// Removing an object means removing its rows and then its files. The rows
// go first: a file left behind only costs an orphan in the store, whereas a
// row pointing at a file that is gone shows a broken image.
//
// The failures of the store never propagate, for the same reason they do not
// propagate on an upload: the object is gone, and the caller has nothing
// left to decide.
const forget = (paths: ReadonlyArray<string>) =>
  Effect.gen(function* () {
    const files = yield* Files;

    yield* Effect.forEach(
      paths,
      (path) =>
        files.remove(path).pipe(
          Effect.tapError((failure) =>
            Effect.logWarning('File of a removed object not removed', {
              path,
              failure,
            }),
          ),
          Effect.ignore,
        ),
      { discard: true },
    );
  });

export const removeNotice = (id: number) =>
  Effect.gen(function* () {
    const screenshot = yield* (yield* Moderation).deleteNotice(id);

    yield* forget(
      screenshot === null ? [] : [storagePath('screenshotFile', screenshot)],
    );
  });

export const removeContributor = (id: number) =>
  Effect.gen(function* () {
    const paths = yield* (yield* Moderation).deleteContributor(id);

    yield* forget(paths);
  });
