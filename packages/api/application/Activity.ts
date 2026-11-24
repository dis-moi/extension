import { Context, type Effect } from 'effect';

// The aggregates over the measurement tables — rating, subscription,
// extension — kept apart from the catalogue reads of Supervision. They share
// no table with it, they are the only ones whose cost is counted in seconds,
// and they are therefore the only ones a caller has to cache.

export interface RatingTotals {
  readonly badge: number;
  readonly displays: number;
  readonly unfolds: number;
  readonly outboundClicks: number;
  readonly likes: number;
  readonly dislikes: number;
  readonly dismissals: number;
}

export interface DailyPoint {
  readonly day: string;
  readonly value: number;
}

export interface Volumes {
  readonly installs: number;
  readonly subscriptions: number;
  readonly servedContributors: number;
  readonly targetingContexts: number;
}

export interface FollowedContributor {
  readonly id: number;
  readonly name: string;
  readonly activeSubscribers: number;
  readonly publicNotices: number;
  readonly categories: ReadonlyArray<string>;
}

export class Activity extends Context.Service<
  Activity,
  {
    // Read from the counted columns of the notices, not from the rating
    // table: summing 2,340 rows takes 64 ms where aggregating 11.6 million
    // takes 12 s, for the same result.
    readonly ratingTotals: Effect.Effect<RatingTotals>;

    readonly volumes: Effect.Effect<Volumes>;

    // The table has no index on the timestamp: 30 days cost a second and a
    // half, 90 days four seconds. The caller has to cache.
    dailySeries(
      type: string,
      days: number,
    ): Effect.Effect<ReadonlyArray<DailyPoint>>;

    mostFollowedContributors(
      limit: number,
    ): Effect.Effect<ReadonlyArray<FollowedContributor>>;
  }
>()('api/application/Activity') {}
