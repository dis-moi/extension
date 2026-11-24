import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { Supervision } from '../application/Supervision';
import { ApiLive } from '../Live';

layer(ApiLive)('picking list of the contributors', (it) => {
  it.effect('gives the 211 contributors, sorted by name', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const options = yield* supervision.contributorsForPicking;

      assert.strictEqual(options.length, 211);

      const names = options.map((option) => option.name);
      assert.deepStrictEqual(
        [...names],
        [...names].sort((a, b) => a.localeCompare(b, 'fr')),
        'sorted by name',
      );
    }),
  );

  it.effect(
    'stays under 300 ms, where the complete list takes close to a thousand, having no need to scan the 6.2 million subscriptions',
    () =>
      Effect.gen(function* () {
        const supervision = yield* Supervision;

        const start = Date.now();
        yield* supervision.contributorsForPicking;
        const elapsed = Date.now() - start;

        assert.isBelow(elapsed, 300, `${elapsed} ms`);
      }),
  );
});
