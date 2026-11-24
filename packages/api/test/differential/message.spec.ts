import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { layer } from '@effect/vitest';
import { assert } from '@effect/vitest';
import { Effect } from 'effect';
import { SqlClient } from 'effect/sql';
import { renderMessage, stripMessage } from '../../domain/Message';
import { DatabaseLive } from '../../infrastructure/sql/Database';

// The eight examples of the PHP test do not cover urllinker: detecting a
// bare URL in free text is full of awkward cases. This one takes the 2,037
// messages actually served and compares the rendering byte for byte with
// what production answered.

interface ServedNotice {
  readonly id: number;
  readonly message: string;
  readonly strippedMessage: string;
}

const corpus = (): ReadonlyArray<ServedNotice> =>
  [0, 1000, 2000].flatMap(
    (offset) =>
      JSON.parse(
        readFileSync(
          join(__dirname, '../fixtures/v3', `notices-${offset}.json`),
          'utf8',
        ),
      ) as ServedNotice[],
  );

const rawMessages = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;

  const rows = yield* sql<{ id: number; message: string }>`
    SELECT n.id, n.message
      FROM notice n
      JOIN contributor c ON c.id = n.contributor_id
     WHERE c.enabled = 1
       AND n.visibility = 'public'
       AND (n.expires >= NOW()
            OR n.expires IS NULL
            OR (n.expires <= NOW() AND n.unpublished_on_expiration = 0))
  `;

  return new Map(rows.map((row) => [row.id, row.message]));
});

const firstDifference = (expected: string, obtained: string): string => {
  let i = 0;
  while (
    i < expected.length &&
    i < obtained.length &&
    expected[i] === obtained[i]
  ) {
    i += 1;
  }
  const from = Math.max(0, i - 60);
  return (
    `at byte ${i}\n` +
    `  expected: …${JSON.stringify(expected.slice(from, i + 60))}\n` +
    `  obtained: …${JSON.stringify(obtained.slice(from, i + 60))}`
  );
};

layer(DatabaseLive)('rendering of the messages against production', (it) => {
  it.effect('reproduces "message" for the 2,037 served notices', () =>
    Effect.gen(function* () {
      const raw = yield* rawMessages;
      const expected = corpus();

      assert.strictEqual(
        raw.size,
        expected.length,
        'the local database does not serve the same number of notices as production — reload it',
      );

      const differences: string[] = [];
      for (const notice of expected) {
        const message = raw.get(notice.id);
        if (message === undefined) {
          differences.push(
            `notice ${notice.id}: missing from the local database`,
          );
          continue;
        }
        const obtained = renderMessage(message);
        if (obtained !== notice.message) {
          differences.push(
            `notice ${notice.id} ${firstDifference(notice.message, obtained)}`,
          );
        }
      }

      assert.deepStrictEqual(
        differences.slice(0, 5),
        [],
        `${differences.length} difference(s) out of ${expected.length}`,
      );
    }),
  );

  it.effect('reproduces "strippedMessage" for the 2,037 served notices', () =>
    Effect.gen(function* () {
      const raw = yield* rawMessages;
      const expected = corpus();

      const differences: string[] = [];
      for (const notice of expected) {
        const message = raw.get(notice.id);
        if (message === undefined) continue;
        const obtained = stripMessage(message);
        if (obtained !== notice.strippedMessage) {
          differences.push(
            `notice ${notice.id} ${firstDifference(notice.strippedMessage, obtained)}`,
          );
        }
      }

      assert.deepStrictEqual(
        differences.slice(0, 5),
        [],
        `${differences.length} difference(s) out of ${expected.length}`,
      );
    }),
  );
});
