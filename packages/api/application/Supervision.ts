import { Context, type Effect } from 'effect';
import type { Visibility } from '../domain/NoticeVisibility';
import type { WallClockTime } from './ReadModels';

// The reads of the administration do not go through V3, which only shows
// what is public: drafts, questions, private notes and counters are needed
// here. The Next server components call them directly.

export interface Counts {
  readonly total: number;
  readonly byVisibility: { readonly [V in Visibility]: number };
  readonly expired: number;
  readonly unpublishedOnExpiration: number;
}

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

export interface PendingNotice {
  readonly id: number;
  readonly visibility: Visibility;
  readonly message: string;
  readonly created: WallClockTime;
  readonly contributor: string | null;
  readonly contributorEmail: string | null;
  readonly exampleUrl: string | null;
}

export interface NoticeRow {
  readonly id: number;
  readonly message: string;
  readonly visibility: Visibility;
  readonly locale: string | null;
  readonly contributor: string | null;
  readonly contributorId: number | null;
  readonly targeting: ReadonlyArray<string>;
  readonly contextCount: number;
  readonly displays: number;
  readonly unfolds: number;
  readonly likes: number;
  readonly expires: WallClockTime | null;
  readonly unpublishedOnExpiration: boolean;
  readonly created: WallClockTime;
  readonly updated: WallClockTime;
}

// These two vocabularies reach the application straight from a query string,
// so what counts as one of them is stated here, next to the type, rather than
// in whichever page happens to read the URL.
export const TABS = [
  'to-review',
  'all',
  'public',
  'expired',
  'archived',
] as const;

export const SORT_KEYS = [
  'recent',
  'displayed',
  'unfolded',
  'expiration',
] as const;

export type Tab = (typeof TABS)[number];
export type SortKey = (typeof SORT_KEYS)[number];

export const isTab = (value: unknown): value is Tab =>
  (TABS as ReadonlyArray<unknown>).includes(value);

export const isSortKey = (value: unknown): value is SortKey =>
  (SORT_KEYS as ReadonlyArray<unknown>).includes(value);

export interface NoticeFilters {
  readonly tab: Tab;
  readonly search?: string | undefined;
  readonly contributorId?: number | undefined;
  readonly locale?: string | undefined;
  readonly sort?: SortKey;
  readonly page: number;
  readonly perPage: number;
}

export interface RowsPage {
  readonly rows: ReadonlyArray<NoticeRow>;
  readonly total: number;
}

export interface EditableContext {
  readonly id: number;
  readonly description: string | null;
  readonly exampleUrl: string | null;
  readonly urlRegex: string;
  readonly excludeUrlRegex: string | null;
  readonly querySelector: string | null;
  readonly xpath: string | null;
  readonly domains: ReadonlyArray<{
    readonly id: number;
    readonly name: string;
  }>;
  readonly domainsSets: ReadonlyArray<{
    readonly id: number;
    readonly name: string;
  }>;
}

export interface EditableNotice {
  readonly id: number;
  readonly message: string;
  readonly note: string | null;
  readonly visibility: Visibility;
  readonly locale: string | null;
  readonly screenshot: string | null;
  readonly excludeUrlRegex: string | null;
  readonly expires: WallClockTime | null;
  readonly unpublishedOnExpiration: boolean;
  readonly created: WallClockTime;
  readonly updated: WallClockTime;
  readonly contributorId: number | null;
  readonly relayers: ReadonlyArray<{
    readonly id: number;
    readonly name: string;
  }>;
  readonly contexts: ReadonlyArray<EditableContext>;
  readonly counters: RatingTotals;
}

export interface ContributorRow {
  readonly id: number;
  readonly name: string;
  readonly email: string | null;
  readonly categories: ReadonlyArray<string>;
  readonly locale: string | null;
  readonly enabled: boolean;
  readonly publicNotices: number;
  readonly activeSubscribers: number;
  readonly pinnedNotice: string | null;
  readonly avatar: string | null;
}

export interface FollowedContributor {
  readonly id: number;
  readonly name: string;
  readonly activeSubscribers: number;
  readonly publicNotices: number;
  readonly categories: ReadonlyArray<string>;
}

export interface EditableContributor {
  readonly id: number;
  readonly name: string;
  readonly title: string | null;
  readonly email: string | null;
  readonly website: string | null;
  readonly intro: string | null;
  readonly locale: string | null;
  readonly categories: ReadonlyArray<string>;
  readonly enabled: boolean;
  readonly avatar: string | null;
  readonly banner: string | null;
  readonly preview: string | null;
  readonly pinned: ReadonlyArray<{
    readonly id: number;
    readonly message: string;
  }>;
  readonly notices: {
    readonly total: number;
    readonly public: number;
  };
  readonly totalSubscriptions: number;
}

export interface DomainsSetRow {
  readonly id: number;
  readonly name: string;
  readonly domains: ReadonlyArray<string>;
  // The figure that matters before touching one: "Amazon" serves 633 of
  // them, and the former administration did not show it.
  readonly contexts: number;
}

export class Supervision extends Context.Service<
  Supervision,
  {
    readonly counts: Effect.Effect<Counts>;

    // Read from the counted columns of the notices, not from the rating
    // table: summing 2,340 rows takes 64 ms where aggregating 11.6 million
    // takes 12 s, for the same result.
    readonly ratingTotals: Effect.Effect<RatingTotals>;

    readonly volumes: Effect.Effect<{
      readonly installs: number;
      readonly subscriptions: number;
      readonly servedContributors: number;
      readonly targetingContexts: number;
    }>;

    // The table has no index on the timestamp: 30 days cost a second and a
    // half, 90 days four seconds. The caller has to cache.
    dailySeries(
      type: string,
      days: number,
    ): Effect.Effect<ReadonlyArray<DailyPoint>>;

    pendingQueue(limit: number): Effect.Effect<ReadonlyArray<PendingNotice>>;

    notices(filters: NoticeFilters): Effect.Effect<RowsPage>;

    notice(id: number): Effect.Effect<EditableNotice | null>;

    readonly contributors: Effect.Effect<ReadonlyArray<ContributorRow>>;

    // Counting the active subscribers scans 6.2 million rows: a dropdown
    // does not need it.
    readonly contributorsForPicking: Effect.Effect<
      ReadonlyArray<{ readonly id: number; readonly name: string }>
    >;

    contributor(id: number): Effect.Effect<EditableContributor | null>;

    mostFollowedContributors(
      limit: number,
    ): Effect.Effect<ReadonlyArray<FollowedContributor>>;

    readonly domainsSets: Effect.Effect<ReadonlyArray<DomainsSetRow>>;

    readonly contributorsByCategory: Effect.Effect<
      ReadonlyArray<{ readonly category: string; readonly number: number }>
    >;
  }
>()('api/application/Supervision') {}
