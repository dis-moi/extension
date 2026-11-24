import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { Activity } from '../application/Activity';
import { ApiLive } from '../Live';

layer(ApiLive)('aggregates of the measurement tables', (it) => {
  it.effect(
    'reads the rating totals off the counted columns, the likes being a balance of 3,077 minus 94',
    () =>
      Effect.gen(function* () {
        const activity = yield* Activity;
        const totals = yield* activity.ratingTotals;

        assert.strictEqual(totals.badge, 10471172);
        assert.strictEqual(totals.displays, 982242);
        assert.strictEqual(totals.unfolds, 110595);
        assert.strictEqual(totals.outboundClicks, 37382);

        assert.strictEqual(totals.likes, 2983);
        assert.strictEqual(totals.dislikes, 491);
        assert.strictEqual(totals.dismissals, 1454);
      }),
  );

  it.effect('counts the volumes', () =>
    Effect.gen(function* () {
      const activity = yield* Activity;
      const volumes = yield* activity.volumes;

      assert.strictEqual(volumes.installs, 391761);
      assert.strictEqual(volumes.subscriptions, 6233156);
      assert.strictEqual(volumes.servedContributors, 178);
      assert.strictEqual(volumes.targetingContexts, 4613);
    }),
  );

  it.effect('ranks the contributors by active subscribers', () =>
    Effect.gen(function* () {
      const activity = yield* Activity;
      const head = yield* activity.mostFollowedContributors(5);

      assert.strictEqual(head.length, 5);
      const subscribers = head.map(
        (contributor) => contributor.activeSubscribers,
      );
      assert.deepStrictEqual(
        [...subscribers],
        [...subscribers].sort((a, b) => b - a),
        'sorted by descending number',
      );
    }),
  );

  it.effect('fills in the rating-free days of the daily series', () =>
    Effect.gen(function* () {
      const activity = yield* Activity;
      const series = yield* activity.dailySeries('badge', 30);

      assert.strictEqual(series.length, 31, '30 days plus today');
      for (const point of series) {
        assert.match(point.day, /^\d{4}-\d{2}-\d{2}$/);
        assert.isAtLeast(point.value, 0);
      }
      assert.isAbove(
        series.reduce((total, point) => total + point.value, 0),
        0,
        'production still receives ratings',
      );
    }),
  );
});
