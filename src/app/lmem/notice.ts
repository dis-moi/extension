import { find } from 'ramda';
import { Ratings } from './rating';
import { Contributor, NewContributor } from './contributor';
import { captureMessage } from '../utils/sentry';

export interface Notice {
  id: number;
  url: string;
  created: Date;
  modified: Date;
  contributor: Contributor;
  message: string;
  ratings: Ratings;
  visibility: 'public' | 'private';
}

export interface Contribution {
  url: string;
  created: Date;
  contributor: NewContributor;
  message: string;
}

export interface NoticeState {
  read: boolean;
  liked: boolean;
  justLiked?: boolean;
  disliked: boolean;
  justDisliked?: boolean;
  dismissed: boolean;
  justDismissed?: boolean;
}

export interface StatefulNotice extends Notice {
  state: NoticeState;
}

export enum NoticeFeedbackType {
  DISMISS = 'dismiss',
  CONFIRM_DISMISS = 'confirmDissmiss',
  UNDISMISS = 'undismiss',
  LIKE = 'like',
  UNLIKE = 'unlike',
  DISLIKE = 'dislike',
  CONFIRM_DISLIKE = 'confirmDislike',
  UNDISLIKE = 'undislike'
}

/* eslint-disable no-nested-ternary */
export type IgnoringReason = 'dislike' | 'dismiss' | 'other';
export const isIgnored = (notice: StatefulNotice): boolean =>
  notice.state.dismissed || notice.state.disliked;
export const getIgnoringReason = (notice: StatefulNotice): IgnoringReason =>
  notice.state.dismissed ? 'dismiss' : 'dislike';

export const dismissNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: true,
    justDismissed: true
  }
});

export const confirmDismissNotice = (
  notice: StatefulNotice
): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    justDismissed: false
  }
});

export const undismissNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: false,
    justDismissed: false
  }
});

export const incrementRating = (rating?: number) => (rating || 0) + 1;
export const decrementRating = (rating?: number) => (!rating ? 0 : rating - 1);

export const likeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  ratings: {
    ...notice.ratings,
    likes: incrementRating(notice.ratings.likes)
  },
  state: {
    ...notice.state,
    liked: true,
    justLiked: true
  }
});
export const unlikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  ratings: {
    ...notice.ratings,
    likes: decrementRating(notice.ratings.likes)
  },
  state: {
    ...notice.state,
    liked: false,
    justLiked: false
  }
});
export const dislikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  ratings: {
    ...notice.ratings,
    dislikes: incrementRating(notice.ratings.dislikes)
  },
  state: {
    ...notice.state,
    disliked: true,
    justDisliked: true
  }
});
export const confirmDislikeNotice = (
  notice: StatefulNotice
): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    justDisliked: false
  }
});
export const undislikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  ratings: {
    ...notice.ratings,
    dislikes: decrementRating(notice.ratings.dislikes)
  },
  state: {
    ...notice.state,
    disliked: false,
    justDisliked: false
  }
});
export const markNoticeRead = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    read: true
  }
});

export const getNotice = <N extends Notice>(
  id: number,
  notices: N[]
): N | undefined => find((notice: N): boolean => notice.id === id, notices);

export const isNoticeValid = (notice: {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}): notice is Notice => {
  if (Object(notice) !== notice) return false;

  const { contributor, message } = notice;

  return (
    typeof message === 'string' &&
    Object(contributor) === contributor &&
    typeof contributor.name === 'string'
  );
};

export const warnIfNoticeInvalid = (notice: Notice): boolean => {
  const valid = isNoticeValid(notice);

  if (!valid) {
    captureMessage(`Invalid notice not displayed: ${JSON.stringify(notice)}`);
  }

  return valid;
};

export const shouldNoticeBeShown = (notice: StatefulNotice): boolean =>
  (isNoticeValid(notice) &&
    (!notice.state.dismissed || notice.state.justDismissed) &&
    (!notice.state.disliked || notice.state.justDisliked)) ||
  false;

export const isRead = (notice: StatefulNotice) => notice.state.read;

export const isUnread = (notice: StatefulNotice) => !isRead(notice);

export const compareUnread = (a: StatefulNotice, b: StatefulNotice) =>
  +!isUnread(a) - +!isUnread(b);
