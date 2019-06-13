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

export interface NoticeState {
  read: boolean;
  liked: boolean;
  disliked: boolean;
  dismissed: boolean;
}

export interface StatefulNotice extends Notice {
  state: NoticeState;
}

/* eslint-disable no-nested-ternary */
export type IgnoringReason = 'dislike' | 'dismiss' | 'other';
export const isIgnored = (notice: StatefulNotice): boolean =>
  notice.state.dismissed || notice.state.disliked;
export const ignoringReason = (notice: StatefulNotice): IgnoringReason =>
  notice.state.dismissed ? 'dismiss' : 'dislike';

export const dismissNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: true
  }
});
export const undismissNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: false
  }
});
export const likeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    liked: true
  }
});
export const unlikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    liked: false
  }
});
export const dislikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    disliked: true
  }
});
export const undislikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    disliked: false
  }
});
export const readNotice = (notice: StatefulNotice): StatefulNotice => ({
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

export const shouldNoticeBeShown = (notice: StatefulNotice): boolean =>
  isNoticeValid(notice) && !notice.state.dismissed && !notice.state.disliked;

export const isRead = (notice: StatefulNotice) => notice.state.read;

export const isUnread = (notice: StatefulNotice) => !isRead(notice);
