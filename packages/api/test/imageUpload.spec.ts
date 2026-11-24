import { beforeEach, describe, expect, it } from 'vitest';
import { Effect, Exit, Layer } from 'effect';
import { Files, WriteFailed } from '../application/Files';
import { Moderation } from '../application/Moderation';
import { Randomness } from '../application/Randomness';
import { uploadContributorImage } from '../application/UploadAnImage';
import type { ContributorImageField } from '../domain/UploadedImage';

const DRAW = new Uint8Array(32).fill(10);
const DRAWN_NAME = 'a'.repeat(32);

const png = (size = 64): Uint8Array => {
  const bytes = new Uint8Array(size);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return bytes;
};

let written: Array<{ path: string; size: number }>;
let removed: string[];
let recorded: Array<{ id: number; field: string; fileName: string }>;
let diskBroken: boolean;
let previousImage: string | null;

const files = Layer.succeed(
  Files,
  Files.of({
    read: () => Effect.succeed(null),
    write: (path, content) =>
      diskBroken
        ? Effect.fail(new WriteFailed({ path, cause: 'disk full' }))
        : Effect.sync(() => {
            written.push({ path, size: content.length });
          }),
    remove: (path) =>
      Effect.sync(() => {
        removed.push(path);
      }),
  }),
);

const moderation = Layer.succeed(
  Moderation,
  Moderation.of({
    setVisibility: () => Effect.void,
    saveNotice: () => Effect.void,
    saveContributor: () => Effect.void,
    createNotice: () => Effect.succeed(0),
    deleteNotice: () => Effect.succeed(null),
    createContributor: () => Effect.succeed(0),
    deleteContributor: () => Effect.succeed([]),
    saveContributorImage: (id, field, fileName) =>
      Effect.sync(() => {
        recorded.push({ id, field, fileName });
        return previousImage;
      }),
    saveNoticeScreenshot: () => Effect.succeed(null),
  }),
);

const randomness = Layer.succeed(
  Randomness,
  Randomness.of({ bytes: () => Effect.succeed(DRAW) }),
);

const upload = (
  content: Uint8Array,
  field: ContributorImageField = 'imageFile',
) =>
  Effect.runPromiseExit(
    uploadContributorImage(42, field, content).pipe(
      Effect.provide(Layer.mergeAll(files, moderation, randomness)),
    ),
  );

beforeEach(() => {
  written = [];
  removed = [];
  recorded = [];
  diskBroken = false;
  previousImage = null;
});

describe('uploading a contributor image', () => {
  it('writes the original under the directory of the field, named by the draw', async () => {
    await upload(png());

    expect(written).toEqual([
      { path: `uploads/avatars/${DRAWN_NAME}.png`, size: 64 },
    ]);
  });

  it('files the banner under its own directory', async () => {
    await upload(png(), 'bannerImageFile');

    expect(written[0]?.path).toBe(
      `uploads/contributor_banners/${DRAWN_NAME}.png`,
    );
  });

  it('records the file name on the contributor', async () => {
    const result = await upload(png());

    expect(recorded).toEqual([
      { id: 42, field: 'imageFile', fileName: `${DRAWN_NAME}.png` },
    ]);
    expect(result).toEqual(Exit.succeed(`${DRAWN_NAME}.png`));
  });

  it('refuses what is not an image, writing and recording nothing', async () => {
    const result = await upload(
      new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg" />'),
    );

    expect(Exit.isFailure(result)).toBe(true);
    expect(written).toEqual([]);
    expect(recorded).toEqual([]);
  });

  it('refuses an image beyond the size cap, writing nothing', async () => {
    const result = await upload(png(5 * 1024 * 1024 + 1));

    expect(Exit.isFailure(result)).toBe(true);
    expect(written).toEqual([]);
  });

  it('refuses empty content', async () => {
    const result = await upload(new Uint8Array(0));

    expect(Exit.isFailure(result)).toBe(true);
    expect(written).toEqual([]);
  });

  it('removes the replaced image, as delete_on_update did in Vich', async () => {
    previousImage = 'ancienne.jpg';

    await upload(png());

    expect(removed).toEqual(['uploads/avatars/ancienne.jpg']);
  });

  it('removes nothing when the contributor had no image', async () => {
    await upload(png());

    expect(removed).toEqual([]);
  });

  it('records nothing in the database when the write fails', async () => {
    diskBroken = true;

    const result = await upload(png());

    expect(Exit.isFailure(result)).toBe(true);
    expect(recorded).toEqual([]);
  });
});
