import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { Supervision } from '../application/Supervision';
import { ApiLive } from '../Live';

layer(ApiLive)('reads of the administration', (it) => {
  it.effect(
    'counts the notices by state, 2,017 of them past due and only 9 that stop being shown',
    () =>
      Effect.gen(function* () {
        const supervision = yield* Supervision;
        const counts = yield* supervision.counts;

        assert.strictEqual(counts.total, 2340);
        assert.strictEqual(counts.byVisibility.public, 2043);
        assert.strictEqual(counts.byVisibility.draft, 25);
        assert.strictEqual(counts.byVisibility.question, 29);
        assert.strictEqual(counts.byVisibility.archived, 187);
        assert.strictEqual(counts.byVisibility.private, 56);

        assert.strictEqual(counts.expired, 2017);
        assert.strictEqual(counts.unpublishedOnExpiration, 9);
      }),
  );

  it.effect(
    'reads the rating totals off the counted columns, the likes being a balance of 3,077 minus 94',
    () =>
      Effect.gen(function* () {
        const supervision = yield* Supervision;
        const totals = yield* supervision.ratingTotals;

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
      const supervision = yield* Supervision;
      const volumes = yield* supervision.volumes;

      assert.strictEqual(volumes.installs, 391761);
      assert.strictEqual(volumes.subscriptions, 6233156);
      assert.strictEqual(volumes.servedContributors, 178);
      assert.strictEqual(volumes.targetingContexts, 4613);
    }),
  );

  it.effect('gives the pending queue, the oldest first', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const queue = yield* supervision.pendingQueue(100);

      assert.strictEqual(queue.length, 54, '25 drafts and 29 questions');
      for (const pending of queue) {
        assert.include(['draft', 'question'], pending.visibility);
      }

      const dates = queue.map((pending) => pending.created);
      assert.deepStrictEqual(
        [...dates],
        [...dates].sort(),
        'sorted by ascending date',
      );
    }),
  );

  it.effect('paginates the list of notices by tab', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const expected = {
        'to-review': 54,
        all: 2340,
        public: 2043,
        expired: 2017,
        archived: 187,
      } as const;

      for (const [tab, total] of Object.entries(expected)) {
        const page = yield* supervision.notices({
          tab: tab as keyof typeof expected,
          page: 1,
          perPage: 10,
        });

        assert.strictEqual(page.total, total, `tab ${tab}`);
        assert.isAtMost(page.rows.length, 10);
      }
    }),
  );

  it.effect('searches the message, the note and the targeting', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const page = yield* supervision.notices({
        tab: 'all',
        search: 'leroymerlin',
        page: 1,
        perPage: 20,
      });

      assert.isAbove(page.total, 0, 'the search finds by targeted domain');
    }),
  );

  it.effect('gives notice 242 complete, contexts and domains included', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const notice = yield* supervision.notice(242);
      assert.isNotNull(notice);
      if (notice === null) return;

      assert.strictEqual(notice.visibility, 'public');
      assert.isAbove(notice.contexts.length, 0);
      assert.isAbove(
        notice.contexts.reduce(
          (total, context) => total + context.domains.length,
          0,
        ),
        0,
        'at least one related domain',
      );
      assert.isAbove(notice.counters.badge, 0);
    }),
  );

  it.effect('gives null for a notice that does not exist', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      assert.isNull(yield* supervision.notice(999999));
    }),
  );

  it.effect(
    'lists the 211 contributors, all enabled, the 33 the API does not serve simply having no public notice',
    () =>
      Effect.gen(function* () {
        const supervision = yield* Supervision;
        const contributors = yield* supervision.contributors;

        assert.strictEqual(contributors.length, 211);

        assert.isTrue(
          contributors.every((contributor) => contributor.enabled),
          'all enabled in the current data set',
        );
        assert.strictEqual(
          contributors.filter((contributor) => contributor.publicNotices === 0)
            .length,
          33,
        );
      }),
  );

  it.effect('ranks the contributors by active subscribers', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const head = yield* supervision.mostFollowedContributors(5);

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

  it.effect('spreads the served contributors across the categories', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const spread = yield* supervision.contributorsByCategory;

      const byName = new Map(
        spread.map((share) => [share.category, share.number]),
      );
      assert.strictEqual(byName.get('CONSO'), 73);
      assert.strictEqual(byName.get('MILITANT'), 37);
      assert.strictEqual(byName.get('DIVERS'), 27);
      assert.strictEqual(byName.get('CULTURE'), 21);
    }),
  );

  it.effect('fills in the rating-free days of the daily series', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      const series = yield* supervision.dailySeries('badge', 30);

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
