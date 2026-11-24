import { createRequire } from 'node:module';
import { Config, Effect, Layer } from 'effect';
import { Files, WriteFailed } from '../../application/Files';

// createRequire rather than a static import: this package is walked by the
// module graph of Next, where node:fs depends on the compilation target.
const require_ = createRequire(import.meta.url);

interface FsPromises {
  readFile(path: string): Promise<Buffer>;
  writeFile(path: string, content: Uint8Array): Promise<void>;
  mkdir(path: string, options: { recursive: boolean }): Promise<unknown>;
  rm(path: string, options: { force: boolean }): Promise<void>;
}

const fs: FsPromises = require_('node:fs/promises');
const paths: {
  resolve(...parts: string[]): string;
  dirname(path: string): string;
  sep: string;
} = require_('node:path');

export const filesRoot = Config.String('DISMOI_STORAGE').pipe(
  Config.withDefault('storage'),
);

// A second guard, after parseUploadPath: the layer that touches the disk does
// not depend on the rigour of its callers for its own safety.
export const underRoot = (root: string, path: string): string | null => {
  const absolute = paths.resolve(root, path);
  const prefix = paths.resolve(root) + paths.sep;

  return absolute.startsWith(prefix) ? absolute : null;
};

const service = (root: string) =>
  Files.of({
    read: (path) =>
      Effect.suspend(() => {
        const absolute = underRoot(root, path);
        if (absolute === null) return Effect.succeed(null);

        return Effect.tryPromise(() => fs.readFile(absolute)).pipe(
          Effect.map((buffer): Uint8Array | null => buffer),
          Effect.orElseSucceed(() => null),
        );
      }),

    write: (path, content) =>
      Effect.suspend(() => {
        const absolute = underRoot(root, path);
        if (absolute === null) {
          return Effect.fail(
            new WriteFailed({ path, cause: 'Path outside the root' }),
          );
        }

        return Effect.tryPromise(async () => {
          await fs.mkdir(paths.dirname(absolute), { recursive: true });
          await fs.writeFile(absolute, content);
        }).pipe(
          Effect.catch((error) =>
            Effect.fail(new WriteFailed({ path, cause: String(error) })),
          ),
        );
      }),

    remove: (path) =>
      Effect.suspend(() => {
        const absolute = underRoot(root, path);
        if (absolute === null) {
          return Effect.fail(
            new WriteFailed({ path, cause: 'Path outside the root' }),
          );
        }

        return Effect.tryPromise(() => fs.rm(absolute, { force: true })).pipe(
          Effect.catch((error) =>
            Effect.fail(new WriteFailed({ path, cause: String(error) })),
          ),
        );
      }),
  });

export const diskLayer = (root: string): Layer.Layer<Files> =>
  Layer.succeed(Files, service(root));

export const DiskFilesLive = Layer.effect(
  Files,
  Effect.map(filesRoot, service),
);
