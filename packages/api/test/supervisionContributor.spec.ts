import { assert, layer } from '@effect/vitest';
import { Effect } from 'effect';
import { Supervision } from '../application/Supervision';
import { ApiLive } from '../Live';

layer(ApiLive)('profile of a contributor', (it) => {
  it.effect('gives a contributor with its presentation fields', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const first = (yield* supervision.contributorsForPicking)[0];
      assert.isDefined(first);
      if (first === undefined) return;

      const profile = yield* supervision.contributor(first.id);

      assert.isNotNull(profile);
      if (profile === null) return;

      assert.strictEqual(profile.id, first.id);
      assert.strictEqual(profile.name, first.name);
      assert.isString(profile.name);
      assert.isTrue(profile.name.length > 0);
      assert.isBoolean(profile.enabled);
      assert.isArray(profile.categories);
      assert.isArray(profile.pinned);
    }),
  );

  it.effect('gives null for a contributor that does not exist', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;
      assert.isNull(yield* supervision.contributor(999_999));
    }),
  );

  it.effect('gives the pinned notices in the order of the `sort` column', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const contributors = yield* supervision.contributors;
      const candidate = contributors.find(
        (contributor) => contributor.pinnedNotice !== null,
      );
      assert.isDefined(candidate, 'at least one contributor has a pin');
      if (candidate === undefined) return;

      const profile = yield* supervision.contributor(candidate.id);
      assert.isNotNull(profile);
      if (profile === null) return;

      assert.isTrue(profile.pinned.length > 0);
      assert.isTrue(
        profile.pinned[0]?.message.startsWith(
          candidate.pinnedNotice?.slice(0, 40) ?? '',
        ),
        'the first pin is the one of the list',
      );
    }),
  );

  it.effect('counts its notices, all states together', () =>
    Effect.gen(function* () {
      const supervision = yield* Supervision;

      const contributors = yield* supervision.contributors;
      const candidate = contributors.find(
        (contributor) => contributor.publicNotices > 5,
      );
      assert.isDefined(candidate);
      if (candidate === undefined) return;

      const profile = yield* supervision.contributor(candidate.id);
      assert.isNotNull(profile);
      if (profile === null) return;

      assert.isAtLeast(profile.notices.total, profile.notices.public);
      assert.strictEqual(profile.notices.public, candidate.publicNotices);
    }),
  );
});
