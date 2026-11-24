import { createRequire } from 'node:module';
import { afterAll, assert, beforeAll, describe, it } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { Images } from '../application/Images';
import type { ImageField } from '../domain/UploadedImage';
import type { FilterName } from '../domain/Thumbnail';
import { diskLayer } from '../infrastructure/files/DiskFiles';
import { ImagesSharpLive } from '../infrastructure/images/ImagesSharp';

const require_ = createRequire(import.meta.url);
const fs = require_('node:fs');
const os = require_('node:os');
const paths = require_('node:path');
const sharp = require_('sharp');

const root: string = fs.mkdtempSync(paths.join(os.tmpdir(), 'dismoi-images-'));
const avatars = paths.join(root, 'uploads', 'avatars');
const screenshots = paths.join(root, 'uploads', 'notice_screenshots');

const flatImage = (width: number, height: number) =>
  sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 10, g: 120, b: 200 },
    },
  });

const writeImage = async (
  directory: string,
  name: string,
  width: number,
  height: number,
) => {
  fs.mkdirSync(directory, { recursive: true });
  const image = flatImage(width, height);
  await (name.endsWith('.png') ? image.png() : image.jpeg()).toFile(
    paths.join(directory, name),
  );
};

const sizeAndFormat = async (bytes: Uint8Array) => {
  const { width, height, format } = await sharp(bytes).metadata();
  return { width, height, format };
};

const withTheService = <A>(
  operation: Effect.Effect<A, never, Images>,
): Promise<A> =>
  Effect.runPromise(
    Effect.provide(
      operation,
      ImagesSharpLive.pipe(Layer.provide(diskLayer(root))),
    ),
  );

const thumbnail = (filter: FilterName, field: ImageField, name: string) =>
  withTheService(
    Effect.gen(function* () {
      const images = yield* Images;
      return yield* images.thumbnail(filter, field, name);
    }),
  );

const original = (field: ImageField, name: string) =>
  withTheService(
    Effect.gen(function* () {
      const images = yield* Images;
      return yield* images.original(field, name);
    }),
  );

const cachePath = (filter: FilterName, directory: string, name: string) =>
  paths.join(root, 'media', 'cache', filter, 'uploads', directory, name);

beforeAll(async () => {
  await writeImage(avatars, 'paysage.png', 300, 200);
  await writeImage(avatars, 'minuscule.png', 40, 40);
  await writeImage(screenshots, 'colonne.jpg', 30, 300);
  fs.writeFileSync(
    paths.join(avatars, 'abime.png'),
    Buffer.from('ceci n’est pas une image'),
  );
  fs.writeFileSync(paths.join(avatars, 'carte.svg'), Buffer.from('<svg/>'));
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('images served in place of the PHP backend', () => {
  describe('original file', () => {
    it('is served as it stands with its type', async () => {
      const served = await original('imageFile', 'paysage.png');

      assert.isNotNull(served);
      assert.strictEqual(served.contentType, 'image/png');
      assert.deepStrictEqual(await sizeAndFormat(served.bytes), {
        width: 300,
        height: 200,
        format: 'png',
      });
    });
  });

  describe('thumbnail of a source larger on both sides', () => {
    it('comes out 40x40 for a 300x200 asked as s_thumb', async () => {
      const served = await thumbnail('s_thumb', 'imageFile', 'paysage.png');

      assert.isNotNull(served);
      assert.strictEqual(served.contentType, 'image/png');
      assert.deepStrictEqual(await sizeAndFormat(served.bytes), {
        width: 40,
        height: 40,
        format: 'png',
      });
    });
  });

  describe('thumbnail of a source that already fits', () => {
    it('serves the original bytes without enlarging a 40x40 as xl_thumb', async () => {
      const served = await thumbnail('xl_thumb', 'imageFile', 'minuscule.png');

      assert.isNotNull(served);
      assert.deepStrictEqual(await sizeAndFormat(served.bytes), {
        width: 40,
        height: 40,
        format: 'png',
      });
      assert.deepStrictEqual(
        Buffer.from(served.bytes),
        fs.readFileSync(paths.join(avatars, 'minuscule.png')),
      );
    });
  });

  describe('thumbnail of a source smaller on one side only', () => {
    it('comes out 30x40 for a 30x300 asked as s_thumb', async () => {
      const served = await thumbnail(
        's_thumb',
        'screenshotFile',
        'colonne.jpg',
      );

      assert.isNotNull(served);
      assert.strictEqual(served.contentType, 'image/jpeg');
      assert.deepStrictEqual(await sizeAndFormat(served.bytes), {
        width: 30,
        height: 40,
        format: 'jpeg',
      });
    });
  });

  describe('cache of the thumbnails', () => {
    it('writes the thumbnail where its address points', async () => {
      const expected = cachePath('m_thumb', 'avatars', 'paysage.png');
      fs.rmSync(expected, { force: true });

      await thumbnail('m_thumb', 'imageFile', 'paysage.png');

      assert.isTrue(fs.existsSync(expected), expected);
    });

    it('serves again the thumbnail PHP already computed without recomputing it', async () => {
      const cache = cachePath('l_thumb', 'avatars', 'paysage.png');
      fs.mkdirSync(paths.dirname(cache), { recursive: true });
      await flatImage(11, 7).png().toFile(cache);

      const served = await thumbnail('l_thumb', 'imageFile', 'paysage.png');

      assert.isNotNull(served);
      assert.deepStrictEqual(await sizeAndFormat(served.bytes), {
        width: 11,
        height: 7,
        format: 'png',
      });
    });
  });

  describe('refusals', () => {
    it('gives null for a missing file', async () => {
      assert.isNull(await original('imageFile', 'nulle-part.png'));
      assert.isNull(await thumbnail('s_thumb', 'imageFile', 'nulle-part.png'));
    });

    it('gives null for a file that is not an image', async () => {
      assert.isNull(await thumbnail('s_thumb', 'imageFile', 'abime.png'));
    });

    it('gives null for an SVG, present on the disk or not', async () => {
      assert.isNull(await original('imageFile', 'carte.svg'));
      assert.isNull(await thumbnail('s_thumb', 'imageFile', 'carte.svg'));
    });
  });
});
