import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { SqlClient } from 'effect/sql';
import { V3Reads } from '../../application/V3Reads';
import { encodePhpJson } from '../../http/v3/phpJson';
import {
  CATEGORIES,
  serialiseTargetingContext,
  serialiseRestrictedContext,
  serialiseContributor,
  serialiseNotice,
} from '../../http/v3/serialize';
import { V3Live } from '../../infrastructure/sql/V3ReadsSql';

// Each endpoint is rebuilt from the local database, encoded as PHP encodes
// it, and compared byte for byte with the body production served. That is
// the operational definition of "identical".
const ORIGIN = 'https://api.dismoi.io';

const fixture = (name: string): string =>
  readFileSync(join(__dirname, '../fixtures/v3', name), 'utf8');

// The active subscriber count covers the last seven days only: it changes
// daily, and the comparison cannot rest on it.
const neutraliseSubscribers = (body: string): string =>
  body.replace(/"subscribes":\d+/g, '"subscribes":0');

// The dump was taken at 00:35 and the corpus captured at 03:30; in between
// production received ratings, and every rating refreshes notice.updated.
// One notice out of 2,037 is affected. Should this list need to grow, the
// corpus must be captured again rather than the list extended.
const DRIFTED_NOTICES = new Set([2543]);

const idFromUrl = (url: string): number =>
  Number(url.slice(url.lastIndexOf('/') + 1));

// Two adjustments, and two only: the notices that drifted are removed from
// the lists, and ties on the modification date are put back in identifier
// order — that order is not reproducible, cf. V3ReadsSql. Re-encoding
// weakens nothing: phpJson.spec shows the round trip is the identity over
// the whole corpus.
const canonicalise = (
  body: string,
  updatedByNotice: ReadonlyMap<number, string>,
): string => {
  const sortTies = (urls: ReadonlyArray<string>): Array<string> => {
    const sorted: string[] = [];
    let group: string[] = [];
    let groupDate: string | undefined;

    const flush = () => {
      group.sort((a, b) => idFromUrl(a) - idFromUrl(b));
      sorted.push(...group);
      group = [];
    };

    for (const url of urls) {
      const date = updatedByNotice.get(idFromUrl(url));
      if (date !== groupDate) {
        flush();
        groupDate = date;
      }
      group.push(url);
    }
    flush();

    return sorted;
  };

  const hasDrifted = (element: unknown): boolean =>
    typeof element === 'object' &&
    element !== null &&
    'id' in element &&
    typeof element.id === 'number' &&
    DRIFTED_NOTICES.has(element.id);

  const retouch = (value: unknown): unknown => {
    if (Array.isArray(value)) {
      return value.filter((element) => !hasDrifted(element)).map(retouch);
    }

    if (typeof value !== 'object' || value === null) return value;

    const retouched: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(
      value as Record<string, unknown>,
    )) {
      retouched[key] =
        key === 'noticesUrls' && Array.isArray(inner)
          ? sortTies(inner as ReadonlyArray<string>)
          : retouch(inner);
    }
    return retouched;
  };

  return encodePhpJson(retouch(JSON.parse(body)));
};

const sameBody = (expected: string, obtained: string, what: string): void => {
  if (expected === obtained) return;

  let i = 0;
  while (
    i < expected.length &&
    i < obtained.length &&
    expected[i] === obtained[i]
  ) {
    i += 1;
  }
  const from = Math.max(0, i - 80);
  assert.fail(
    `${what}: differs at byte ${i} of ${expected.length}\n` +
      `  expected …${expected.slice(from, i + 110)}\n` +
      `  obtained …${obtained.slice(from, i + 110)}`,
  );
};

const updateDates = Effect.gen(function* () {
  const sql = yield* SqlClient.SqlClient;
  const rows = yield* sql<{ id: number; updated: string }>`
    SELECT n.id, n.updated FROM notice n
  `;
  return new Map(rows.map((row) => [row.id, row.updated]));
});

layer(V3Live)('V3 payloads', (it) => {
  it.effect('GET /categories', () =>
    Effect.sync(() => {
      sameBody(
        fixture('categories.json'),
        encodePhpJson(CATEGORIES),
        'categories',
      );
    }),
  );

  it.effect('GET /restricted-contexts', () =>
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const contexts = yield* reads.restrictedContexts;

      sameBody(
        fixture('restricted-contexts.json'),
        encodePhpJson(contexts.map(serialiseRestrictedContext)),
        'restricted-contexts',
      );
    }),
  );

  it.effect('GET /matching-contexts', () =>
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const contexts = yield* reads.targetingContexts(null);

      sameBody(
        fixture('matching-contexts-all.json'),
        encodePhpJson(
          contexts.map((context) => serialiseTargetingContext(ORIGIN, context)),
        ),
        'matching-contexts',
      );
    }),
  );

  it.effect('GET /matching-contexts?contributors=[13]', () =>
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const contexts = yield* reads.targetingContexts([13]);

      sameBody(
        fixture('matching-contexts-13.json'),
        encodePhpJson(
          contexts.map((context) => serialiseTargetingContext(ORIGIN, context)),
        ),
        'matching-contexts of contributor 13',
      );
    }),
  );

  for (const offset of [0, 1000, 2000]) {
    it.effect(`GET /notices?limit=1000&offset=${offset}`, () =>
      Effect.gen(function* () {
        const reads = yield* V3Reads;
        const dates = yield* updateDates;
        const page = yield* reads.notices({ limit: 1000, offset });

        sameBody(
          canonicalise(fixture(`notices-${offset}.json`), dates),
          canonicalise(
            encodePhpJson(
              page.notices.map((notice) =>
                serialiseNotice(ORIGIN, notice, { with: false }),
              ),
            ),
            dates,
          ),
          `notices offset ${offset}`,
        );
      }),
    );
  }

  it.effect('GET /contributors', () =>
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const dates = yield* updateDates;
      const contributors = yield* reads.contributors;

      sameBody(
        canonicalise(
          neutraliseSubscribers(fixture('contributors.json')),
          dates,
        ),
        canonicalise(
          neutraliseSubscribers(
            encodePhpJson(
              contributors.map((contributor) =>
                serialiseContributor(ORIGIN, contributor),
              ),
            ),
          ),
          dates,
        ),
        'contributors',
      );
    }),
  );

  it.effect('GET /notices/{id} over a sample', () =>
    Effect.gen(function* () {
      const reads = yield* V3Reads;
      const dates = yield* updateDates;
      const firstPage = JSON.parse(fixture('notices-0.json')) as Array<{
        id: number;
      }>;

      const sample = firstPage
        .slice(0, 24)
        .filter(({ id }) => !DRIFTED_NOTICES.has(id));

      for (const { id } of sample) {
        const detail = yield* reads.detailedNotice(id);
        assert.isNotNull(
          detail,
          `notice ${id} missing from the local database`,
        );
        if (detail === null) continue;

        sameBody(
          canonicalise(
            neutraliseSubscribers(fixture(`notice/${id}.json`)),
            dates,
          ),
          canonicalise(
            neutraliseSubscribers(
              encodePhpJson(
                serialiseNotice(ORIGIN, detail.notice, {
                  with: true,
                  contributor: detail.contributor,
                  relayers: detail.relayers,
                }),
              ),
            ),
            dates,
          ),
          `notice ${id}`,
        );
      }
    }),
  );
});
