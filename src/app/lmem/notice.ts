import { find } from 'ramda';
import { Source } from './source';
import { intentions, Intention } from './intention';
import { Ratings } from './rating';
import { Contributor } from './contributor';

export interface Notice {
  id: number;
  created: Date;
  modified: Date;
  intention: Intention;
  contributor: Contributor;
  message: string;
  source?: Source;
  ratings: Ratings;
  visibility: 'public' | 'private';
}

export interface EnhancedNotice extends Notice {
  status: {
    read: boolean;
    liked: boolean;
    justLiked?: boolean;
    disliked: boolean;
    justDisliked?: boolean;
    dismissed: boolean;
    justDismissed?: boolean;
  };
}

/* eslint-disable no-nested-ternary */
export type IgnoringReason = 'dislike' | 'dismiss' | 'other';
export const isIgnored = (notice: EnhancedNotice): boolean =>
  notice.status.dismissed || notice.status.disliked;
export const ignoringReason = (notice: EnhancedNotice): IgnoringReason =>
  notice.status.dismissed ? 'dismiss' : 'dislike';

export const dismissNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    dismissed: true,
    justDismissed: true
  }
});
export const undismissNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    dismissed: false,
    justDismissed: false
  }
});
export const likeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    liked: true,
    justLiked: true
  }
});
export const unlikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    liked: false,
    justLiked: false
  }
});
export const dislikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    disliked: true,
    justDisliked: true
  }
});
export const undislikeNotice = (notice: EnhancedNotice): EnhancedNotice => ({
  ...notice,
  status: {
    ...notice.status,
    disliked: false,
    justDisliked: false
  }
});

export const getNotice = <N extends Notice>(
  id: number,
  notices: N[]
): N | undefined => find((notice: N): boolean => notice.id === id, notices);

export const isNoticeValid = (notice: {
  [key: string]: any;
}): notice is Notice => {
  if (Object(notice) !== notice) return false;

  const { contributor, message, intention } = notice;

  return (
    typeof message === 'string' &&
    Object(contributor) === contributor &&
    typeof contributor.name === 'string' &&
    typeof intention === 'string' &&
    intentions.includes(intention as Intention)
  );
};

export const warnIfNoticeInvalid = (notice: Notice): boolean => {
  const valid = isNoticeValid(notice);

  if (!valid) {
    console.warn('Invalid notice not displayed:', notice);
  }

  return valid;
};

export const shouldNoticeBeShown = (notice: EnhancedNotice): boolean =>
  (isNoticeValid(notice) &&
    (!notice.status.dismissed || notice.status.justDismissed) &&
    (!notice.status.disliked || notice.status.justDisliked)) ||
  false;

export const isRead = (notice: EnhancedNotice) => notice.status.read;

export const isUnread = (notice: EnhancedNotice) => !isRead(notice);
