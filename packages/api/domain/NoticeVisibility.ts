import { Schema } from 'effect';

// Gathers NoticeRepository::addNoticeExpirationLogic,
// addNoticeVisibilityLogic and the contributor condition of
// createQueryForPublicNotices.

// The column is an unconstrained varchar: this Schema is the boundary.
export const VISIBILITIES = [
  'public',
  'private',
  'archived',
  'draft',
  'question',
] as const;

export const Visibility = Schema.Literals(VISIBILITIES);
export type Visibility = typeof Visibility.Type;

export const DEFAULT_VISIBILITY: Visibility = 'public';

export const PENDING_VISIBILITIES: ReadonlyArray<Visibility> = [
  'draft',
  'question',
];

export interface NoticeToJudge {
  readonly visibility: Visibility;
  readonly expires: Date | null;
  readonly unpublishedOnExpiration: boolean;
  readonly contributorEnabled: boolean;
}

// Of the 2,017 notices whose date has passed in production, 9 carry
// unpublishedOnExpiration; for the rest, expires documents an intention.
const stillWithinItsDates = (notice: NoticeToJudge, now: Date): boolean =>
  notice.expires === null ||
  notice.expires.getTime() >= now.getTime() ||
  !notice.unpublishedOnExpiration;

export const isServed = (
  notice: NoticeToJudge,
  now: Date = new Date(),
): boolean =>
  notice.contributorEnabled &&
  notice.visibility === 'public' &&
  stillWithinItsDates(notice, now);
