import * as R from 'ramda';
import { Source } from './source';
import { intentions, Intention } from './intention';
import { Ratings } from './rating';
import { Contributor, NewContributor } from './contributor';
import { captureMessage } from '../utils/sentry';

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

export interface Contribution {
  url: string;
  created: Date;
  intention: Intention;
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
  CONFIRM_DISMISS = 'confirmDismiss',
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
export const ignoringReason = (notice: StatefulNotice): IgnoringReason =>
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
export const likeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    liked: true,
    justLiked: true
  }
});
export const unlikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
  state: {
    ...notice.state,
    liked: false,
    justLiked: false
  }
});
export const dislikeNotice = (notice: StatefulNotice): StatefulNotice => ({
  ...notice,
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

type NoticeTransformer<N extends Notice = Notice> = (notice: N) => N;
export const findAndTransformNotice = <N extends Notice>(
  noticeId: number,
  transformer: NoticeTransformer<N>
) => R.map(R.ifElse(R.eqProps('id', noticeId), transformer, R.identity));

export const findNoticeAndApplyFeedback = (
  noticeId: number,
  feedbackType: NoticeFeedbackType
) => (notices: StatefulNotice[]) => {
  switch (feedbackType) {
    case 'dismiss':
      return findAndTransformNotice(noticeId, dismissNotice)(notices);

    case 'confirmDismiss':
      return findAndTransformNotice(noticeId, confirmDismissNotice)(notices);

    case 'undismiss':
      return findAndTransformNotice(noticeId, undismissNotice)(notices);

    case 'like':
      return findAndTransformNotice(noticeId, likeNotice)(notices);

    case 'unlike':
      return findAndTransformNotice(noticeId, unlikeNotice)(notices);

    case 'dislike':
      return findAndTransformNotice(noticeId, dislikeNotice)(notices);

    case 'confirmDislike':
      return findAndTransformNotice(noticeId, confirmDislikeNotice)(notices);

    case 'undislike':
      return findAndTransformNotice(noticeId, undislikeNotice)(notices);
  }
  return notices;
};

export const getNotice = <N extends Notice>(
  id: number,
  notices: N[]
): N | undefined => R.find((notice: N): boolean => notice.id === id, notices);

export const isNoticeValid = (notice: {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
    captureMessage(`Invalid notice not displayed: ${JSON.stringify(notice)}`);
  }

  return valid;
};

export const shouldNoticeBeShown = (notice: StatefulNotice): boolean => {
  console.log('shouldNoticeBeShown');
  return (
    (isNoticeValid(notice) &&
      (!notice.state.dismissed || notice.state.justDismissed) &&
      (!notice.state.disliked || notice.state.justDisliked)) ||
    false
  );
};

export const isRead = (notice: StatefulNotice) => notice.state.read;

export const isUnread = (notice: StatefulNotice) => !isRead(notice);
