import { createRequire } from 'node:module';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Effect, Exit } from 'effect';
import { Files } from '../application/Files';
import { diskLayer } from '../infrastructure/files/DiskFiles';

const require_ = createRequire(import.meta.url);
const fs = require_('node:fs');
const os = require_('node:os');
const paths = require_('node:path');

let root: string;

const run = <A, E>(operation: Effect.Effect<A, E, Files>) =>
  Effect.runPromiseExit(operation.pipe(Effect.provide(diskLayer(root))));

const write = (path: string, bytes: string) =>
  run(
    Effect.gen(function* () {
      yield* (yield* Files).write(path, new TextEncoder().encode(bytes));
    }),
  );

beforeAll(() => {
  root = fs.mkdtempSync(paths.join(os.tmpdir(), 'dismoi-files-'));
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('writing into the storage', () => {
  it('creates the missing directories and reads back what it wrote', async () => {
    const result = await write('uploads/avatars/a.png', 'contenu');

    expect(Exit.isSuccess(result)).toBe(true);
    expect(
      fs.readFileSync(paths.join(root, 'uploads/avatars/a.png'), 'utf8'),
    ).toBe('contenu');
  });

  it('fails rather than write outside the root', async () => {
    const result = await write('../evade.png', 'contenu');

    expect(Exit.isFailure(result)).toBe(true);
    expect(fs.existsSync(paths.join(root, '..', 'evade.png'))).toBe(false);
  });

  it('fails when the disk refuses', async () => {
    fs.writeFileSync(paths.join(root, 'barrage'), '');

    const result = await write('barrage/a.png', 'contenu');

    expect(Exit.isFailure(result)).toBe(true);
  });
});
