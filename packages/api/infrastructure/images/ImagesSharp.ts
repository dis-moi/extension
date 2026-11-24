import { createRequire } from 'node:module';
import { Effect, Layer } from 'effect';
import { Files } from '../../application/Files';
import { Images, type ServedImage } from '../../application/Images';
import {
  boxOfFilter,
  FILTERS,
  pngCompressionLevel,
  transformation,
} from '../../domain/Thumbnail';
import {
  contentType,
  formatOfName,
  storagePath,
  thumbnailStoragePath,
  type ImageFormat,
} from '../../domain/UploadedImage';

// The dimensions and the format of the PHP are reproduced; the bytes are not,
// GD resampling bilinearly where libvips uses Lanczos.
const require_ = createRequire(import.meta.url);

interface Transformable {
  metadata(): Promise<{ width?: number; height?: number }>;
  resize(
    width: number,
    height: number,
    options: { fit: 'fill' },
  ): Transformable;
  extract(region: {
    left: number;
    top: number;
    width: number;
    height: number;
  }): Transformable;
  png(options: { compressionLevel: number }): Transformable;
  jpeg(options: { quality: number }): Transformable;
  webp(options: { quality: number }): Transformable;
  toBuffer(): Promise<Buffer>;
}

const sharp: (input: Uint8Array) => Transformable = require_('sharp');

const encode = (
  format: ImageFormat,
  quality: number,
  image: Transformable,
): Transformable => {
  switch (format) {
    case 'png':
      return image.png({ compressionLevel: pngCompressionLevel(quality) });
    case 'jpeg':
      return image.jpeg({ quality });
    case 'webp':
      return image.webp({ quality });
  }
};

export const ImagesSharpLive = Layer.effect(
  Images,
  Effect.gen(function* () {
    const files = yield* Files;

    const serve = (fileName: string, bytes: Uint8Array): ServedImage | null => {
      const type = contentType(fileName);
      return type === null ? null : { bytes, contentType: type };
    };

    return Images.of({
      original: Effect.fn('Images.original')(function* (field, fileName) {
        if (formatOfName(fileName) === null) return null;

        const bytes = yield* files.read(storagePath(field, fileName));

        return bytes === null ? null : serve(fileName, bytes);
      }),

      thumbnail: Effect.fn('Images.thumbnail')(
        function* (filter, field, fileName) {
          const format = formatOfName(fileName);
          if (format === null) return null;

          const cache = thumbnailStoragePath(filter, field, fileName);

          const alreadyComputed = yield* files.read(cache);
          if (alreadyComputed !== null) return serve(fileName, alreadyComputed);

          const source = yield* files.read(storagePath(field, fileName));
          if (source === null) return null;

          const computed = yield* Effect.tryPromise(async () => {
            const { width, height } = await sharp(source).metadata();
            if (width === undefined || height === undefined) return null;

            const operations = transformation(
              { width, height },
              boxOfFilter(filter),
            );

            if (operations.operation === 'copy') return source;

            let image = sharp(source);

            if (operations.resize !== null) {
              image = image.resize(
                operations.resize.width,
                operations.resize.height,
                { fit: 'fill' },
              );
            }

            const crop = operations.crop;

            return await encode(
              format,
              FILTERS[filter].quality,
              image.extract({
                left: crop.x,
                top: crop.y,
                width: crop.width,
                height: crop.height,
              }),
            ).toBuffer();
          }).pipe(
            Effect.tapError((error) =>
              Effect.logWarning('Thumbnail not computable', {
                cache,
                error: String(error),
              }),
            ),
            Effect.orElseSucceed(() => null),
          );

          if (computed === null) return null;

          // A read-only store must serve the recomputed thumbnail rather than
          // answer an error: only the cache is lost.
          yield* files.write(cache, computed).pipe(
            Effect.tapError((failure) =>
              Effect.logWarning('Thumbnail not cached', { failure }),
            ),
            Effect.ignore,
          );

          return serve(fileName, computed);
        },
      ),
    });
  }),
);
