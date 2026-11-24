import type { Visibility } from '../domain/NoticeVisibility';

// A wall-clock time as MySQL stores it, with no zone. It stays a string
// until presentation: converting it here would mean choosing a zone in the
// wrong place, and would shift every date of the API.
export type WallClockTime = string;

export interface TargetingContext {
  readonly id: number;
  readonly noticeId: number;
  readonly urlRegex: string;
  readonly excludeUrlRegex: string | null;
  readonly querySelector: string | null;
  readonly xpath: string | null;
  readonly exampleUrl: string | null;
}

export interface Notice {
  readonly id: number;
  readonly visibility: Visibility;
  readonly message: string;
  readonly locale: string | null;
  readonly screenshot: string | null;
  readonly created: WallClockTime;
  readonly updated: WallClockTime;
  readonly expires: WallClockTime | null;
  readonly unpublishedOnExpiration: boolean;
  readonly likedCount: number;
  readonly dislikedCount: number;
  readonly contributorId: number | null;
  readonly relayerIds: ReadonlyArray<number>;
  readonly exampleMatchingUrl: string | null;
}

export interface PinnedNotice extends Notice {
  readonly pinnedSort: number;
}

export interface Contributor {
  readonly id: number;
  readonly name: string;
  readonly title: string | null;
  readonly website: string | null;
  readonly intro: string | null;
  readonly image: string | null;
  readonly bannerImage: string | null;
  readonly previewImage: string | null;
  readonly locale: string | null;
  readonly categories: ReadonlyArray<string>;
  readonly subscribersActiveInTheLastSevenDays: number;
  readonly publicNotices: ReadonlyArray<Notice>;
  readonly pinnedNotices: ReadonlyArray<PinnedNotice>;
  // Every relayed notice, public or not: filtering by visibility belongs to
  // the presentation. Doctrine's Collection::filter keeps the keys, so that
  // relayedNoticesUrls comes out as a gappy JSON object as soon as one relay
  // is not public — 23 of the 178 served contributors are in that case.
  readonly relays: ReadonlyArray<Notice>;
}

export interface RestrictedContext {
  readonly id: number;
  readonly urlRegex: string;
}

export interface NoticesPage {
  readonly notices: ReadonlyArray<Notice>;
  readonly total: number;
}
