import { beforeEach, describe, expect, it } from 'vitest';
import { Effect, Exit, Layer } from 'effect';
import { Files, WriteFailed } from '../application/Files';
import { Moderation } from '../application/Moderation';
import {
  removeNoticeScreenshot,
  uploadNoticeScreenshot,
} from '../application/UploadAnImage';

const png = (size = 64): Uint8Array => {
  const bytes = new Uint8Array(size);
  bytes.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return bytes;
};

const jpeg = (size = 64): Uint8Array => {
  const bytes = new Uint8Array(size);
  bytes.set([0xff, 0xd8, 0xff]);
  return bytes;
};

let written: Array<{ path: string; size: number }>;
let removed: string[];
let recorded: Array<{ id: number; fileName: string | null }>;
let diskBroken: boolean;
let previousScreenshot: string | null;

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
    saveContributorImage: () => Effect.succeed(null),
    saveNoticeScreenshot: (id, fileName) =>
      Effect.sync(() => {
        recorded.push({ id, fileName });
        return previousScreenshot;
      }),
  }),
);

const upload = (content: Uint8Array, id = 2100) =>
  Effect.runPromiseExit(
    uploadNoticeScreenshot(id, content).pipe(
      Effect.provide(Layer.mergeAll(files, moderation)),
    ),
  );

const clear = (id = 2100) =>
  Effect.runPromiseExit(
    removeNoticeScreenshot(id).pipe(
      Effect.provide(Layer.mergeAll(files, moderation)),
    ),
  );

beforeEach(() => {
  written = [];
  removed = [];
  recorded = [];
  diskBroken = false;
  previousScreenshot = null;
});

describe('uploading the screenshot of a notice', () => {
  it('names the file after the notice, as the PropertyNamer of Vich did', async () => {
    await upload(png());

    expect(written).toEqual([
      { path: 'uploads/notice_screenshots/2100.png', size: 64 },
    ]);
  });

  it('writes the jpg extension production carries for a JPEG', async () => {
    await upload(jpeg());

    expect(written[0]?.path).toBe('uploads/notice_screenshots/2100.jpg');
  });

  it('records the file name on the notice', async () => {
    const result = await upload(png());

    expect(recorded).toEqual([{ id: 2100, fileName: '2100.png' }]);
    expect(result).toEqual(Exit.succeed('2100.png'));
  });

  it('removes the previous screenshot when the format changes its name', async () => {
    previousScreenshot = '2100.jpg';

    await upload(png());

    expect(removed).toEqual(['uploads/notice_screenshots/2100.jpg']);
  });

  it('removes nothing when the new file overwrites the previous one', async () => {
    previousScreenshot = '2100.png';

    await upload(png());

    expect(removed).toEqual([]);
  });

  it('refuses what is not an image, writing and recording nothing', async () => {
    const result = await upload(
      new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg" />'),
    );

    expect(Exit.isFailure(result)).toBe(true);
    expect(written).toEqual([]);
    expect(recorded).toEqual([]);
  });

  it('refuses an image beyond the size cap', async () => {
    const result = await upload(png(5 * 1024 * 1024 + 1));

    expect(Exit.isFailure(result)).toBe(true);
    expect(written).toEqual([]);
  });

  it('records nothing in the database when the write fails', async () => {
    diskBroken = true;

    const result = await upload(png());

    expect(Exit.isFailure(result)).toBe(true);
    expect(recorded).toEqual([]);
  });
});

describe('removing the screenshot of a notice', () => {
  it('clears the column and deletes the file it held', async () => {
    previousScreenshot = '2100.jpg';

    await clear();

    expect(recorded).toEqual([{ id: 2100, fileName: null }]);
    expect(removed).toEqual(['uploads/notice_screenshots/2100.jpg']);
  });

  it('deletes nothing when the notice carried no screenshot', async () => {
    await clear();

    expect(removed).toEqual([]);
  });
});
