// Set before the layer reads the environment.
process.env['DISMOI_DB_PORT'] = process.env['DISMOI_DB_PORT_TEST'] ?? '3311';
process.env['DISMOI_DB_NAME'] = 'dismoi_test';

import { createRequire } from 'node:module';
import { assert, layer } from '@effect/vitest';
import { afterAll, beforeAll } from 'vitest';
import { Effect, Layer } from 'effect';
import { SqlClient } from 'effect/sql';
import { Moderation } from '../application/Moderation';
import {
  removeNoticeScreenshot,
  uploadContributorImage,
  uploadNoticeScreenshot,
} from '../application/UploadAnImage';
import { CryptoRandomnessLive } from '../infrastructure/randomness/CryptoRandomness';
import { diskLayer } from '../infrastructure/files/DiskFiles';
import { DatabaseLive } from '../infrastructure/sql/Database';
import { ModerationSqlLive } from '../infrastructure/sql/ModerationSql';

const require_ = createRequire(import.meta.url);
const fs = require_('node:fs');
const os = require_('node:os');
const paths = require_('node:path');
const sharp = require_('sharp');

const root: string = fs.mkdtempSync(paths.join(os.tmpdir(), 'dismoi-upload-'));

let png: Uint8Array;
let jpeg: Uint8Array;

const TestLayer = Layer.mergeAll(
  ModerationSqlLive,
  diskLayer(root),
  CryptoRandomnessLive,
).pipe(Layer.provideMerge(DatabaseLive));

const seed = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  yield* sql`DELETE FROM contributor WHERE id = 7`;
  yield* sql`
    INSERT INTO contributor (id, name, email, enabled, total_subscriptions, locale)
         VALUES (7, 'Porteur d''image', 'image@exemple.fr', 1, 0, 'fr')
  `;
});

const seedNotice = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  yield* sql`DELETE FROM notice WHERE id = 71`;
  yield* sql`
    INSERT INTO notice (id, message, visibility, unpublished_on_expiration, updated)
         VALUES (71, 'Notice à copie d''écran', 'public', 0, NOW())
  `;
});

beforeAll(async () => {
  const canvas = () =>
    sharp({
      create: {
        width: 8,
        height: 8,
        channels: 3,
        background: { r: 1, g: 2, b: 3 },
      },
    });

  png = await canvas().png().toBuffer();
  jpeg = await canvas().jpeg().toBuffer();
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

layer(TestLayer)('upload all the way to the database', (it) => {
  it.effect(
    'writes the file and sets its name on the column of the field',
    () =>
      Effect.gen(function* () {
        yield* seed;
        const sql = yield* SqlClient.SqlClient;

        const fileName = yield* uploadContributorImage(
          7,
          'bannerImageFile',
          png,
        );

        assert.match(fileName, /^[0-9a-zA-Z]{32}\.png$/);
        assert.isTrue(
          fs.existsSync(
            paths.join(root, 'uploads/contributor_banners', fileName),
          ),
        );

        const rows = yield* sql<{
          image: string | null;
          banner_image: string | null;
        }>`SELECT image, banner_image FROM contributor WHERE id = 7`;

        assert.strictEqual(rows[0]?.banner_image, fileName);
        assert.strictEqual(rows[0]?.image, null);
      }),
  );

  it.effect('removes from the storage the image the new one replaces', () =>
    Effect.gen(function* () {
      yield* seed;

      const first = yield* uploadContributorImage(7, 'imageFile', png);
      const second = yield* uploadContributorImage(7, 'imageFile', png);

      assert.notStrictEqual(first, second);
      assert.isFalse(fs.existsSync(paths.join(root, 'uploads/avatars', first)));
      assert.isTrue(fs.existsSync(paths.join(root, 'uploads/avatars', second)));
    }),
  );

  it.effect('leaves the database untouched when the image is refused', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;

      const refusal = yield* uploadContributorImage(
        7,
        'imageFile',
        new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg" />'),
      ).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'ImageRefused');

      const rows = yield* sql<{
        image: string | null;
      }>`SELECT image FROM contributor WHERE id = 7`;

      assert.strictEqual(rows[0]?.image, null);
    }),
  );

  it.effect('refuses an image set on a contributor that does not exist', () =>
    Effect.gen(function* () {
      yield* seed;

      const refusal = yield* uploadContributorImage(
        4242,
        'imageFile',
        png,
      ).pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'ContributorMissing');
    }),
  );
});

layer(TestLayer)('contributor profile saved', (it) => {
  const profile = {
    name: 'Porteur d’image',
    title: null,
    email: 'image@exemple.fr',
    website: null,
    intro: null,
    locale: 'fr',
    categories: [],
    enabled: true,
    pinned: [],
  };

  it.effect('refuses an email address that is not one', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .saveContributor(7, { ...profile, email: 'image(at)exemple' })
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'InvalidFields');
    }),
  );

  it.effect('refuses a profile set on a contributor that does not exist', () =>
    Effect.gen(function* () {
      yield* seed;
      const moderation = yield* Moderation;

      const refusal = yield* moderation
        .saveContributor(4242, profile)
        .pipe(Effect.flip);

      assert.strictEqual(refusal._tag, 'ContributorMissing');
    }),
  );

  it.effect('saves a valid profile', () =>
    Effect.gen(function* () {
      yield* seed;
      const sql = yield* SqlClient.SqlClient;
      const moderation = yield* Moderation;

      yield* moderation.saveContributor(7, {
        ...profile,
        title: 'porteur',
      });

      const rows = yield* sql<{
        title: string | null;
      }>`SELECT title FROM contributor WHERE id = 7`;

      assert.strictEqual(rows[0]?.title, 'porteur');
    }),
  );
});

layer(TestLayer)('screenshot of a notice', (it) => {
  const screenshotPath = (fileName: string): string =>
    paths.join(root, 'uploads/notice_screenshots', fileName);

  it.effect('writes the file under the identifier of the notice', () =>
    Effect.gen(function* () {
      yield* seedNotice;
      const sql = yield* SqlClient.SqlClient;

      const fileName = yield* uploadNoticeScreenshot(71, png);

      assert.strictEqual(fileName, '71.png');
      assert.isTrue(fs.existsSync(screenshotPath('71.png')));

      const rows = yield* sql<{
        screenshot: string | null;
      }>`SELECT screenshot FROM notice WHERE id = 71`;

      assert.strictEqual(rows[0]?.screenshot, '71.png');
    }),
  );

  it.effect('removes the file the new format leaves behind', () =>
    Effect.gen(function* () {
      yield* seedNotice;

      yield* uploadNoticeScreenshot(71, png);
      const second = yield* uploadNoticeScreenshot(71, jpeg);

      assert.strictEqual(second, '71.jpg');
      assert.isFalse(fs.existsSync(screenshotPath('71.png')));
      assert.isTrue(fs.existsSync(screenshotPath('71.jpg')));
    }),
  );

  it.effect('clears the column and the store on a removal', () =>
    Effect.gen(function* () {
      yield* seedNotice;
      const sql = yield* SqlClient.SqlClient;

      yield* uploadNoticeScreenshot(71, png);
      yield* removeNoticeScreenshot(71);

      assert.isFalse(fs.existsSync(screenshotPath('71.png')));

      const rows = yield* sql<{
        screenshot: string | null;
      }>`SELECT screenshot FROM notice WHERE id = 71`;

      assert.strictEqual(rows[0]?.screenshot, null);
    }),
  );

  it.effect('refuses a screenshot set on a notice that does not exist', () =>
    Effect.gen(function* () {
      yield* seedNotice;

      const refusal = yield* uploadNoticeScreenshot(4242, png).pipe(
        Effect.flip,
      );

      assert.strictEqual(refusal._tag, 'NoticeMissing');
    }),
  );
});
