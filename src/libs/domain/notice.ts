import { find } from 'ramda';
import { captureMessage } from 'libs/utils/sentry';
import { SupportedLanguage } from '../i18n';
import { Ratings } from './rating';
import {
  Contributor,
  ContributorId,
  getContributorFieldsToTrack,
  NewContributor
} from './contributor';

export interface BaseNotice {
  id: number;
  url: string;
  message: string;
  strippedMessage: string;
  exampleMatchingUrl?: string;
  screenshot?: string;
  created: Date;
  modified: string;
  ratings: Ratings;
  visibility: 'public' | 'private';
  locale: SupportedLanguage;
}

export interface NoticeItem extends BaseNotice {
  contributorId: ContributorId;
  relayersIds: ContributorId[];
}

export interface NoticeWithContributor extends BaseNotice {
  contributor: Contributor;
  relayers: Contributor[];
}

export type Notice = NoticeItem | NoticeWithContributor;

export interface Contribution {
  url: string;
  created: Date;
  contributor: NewContributor;
  message: string;
}

export interface Question extends Contribution {
  toContributorId?: ContributorId;
  question: true;
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

export type StatefulNoticeWithContributor = NoticeWithContributor & {
  state: NoticeState;
};
export type StatefulNoticeItem = NoticeItem & {
  state: NoticeState;
};

export type StatefulNotice = StatefulNoticeWithContributor | StatefulNoticeItem;

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

export const dismissNotice = <N extends StatefulNotice>(notice: N): N => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: true,
    justDismissed: true
  }
});

export const confirmDismissNotice = <N extends StatefulNotice>(
  notice: N
): N => ({
  ...notice,
  state: {
    ...notice.state,
    justDismissed: false
  }
});

export const undismissNotice = <N extends StatefulNotice>(notice: N): N => ({
  ...notice,
  state: {
    ...notice.state,
    dismissed: false,
    justDismissed: false
  }
});

export const incrementRating = (rating?: number) => (rating || 0) + 1;
export const decrementRating = (rating?: number) => (!rating ? 0 : rating - 1);

export const likeNotice = <N extends StatefulNotice>(notice: N): N => ({
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
export const unlikeNotice = <N extends StatefulNotice>(notice: N): N => ({
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
export const dislikeNotice = <N extends StatefulNotice>(notice: N): N => ({
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
export const confirmDislikeNotice = <N extends StatefulNotice>(
  notice: N
): N => ({
  ...notice,
  state: {
    ...notice.state,
    justDisliked: false
  }
});
export const undislikeNotice = <N extends StatefulNotice>(notice: N): N => ({
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
export const markNoticeRead = <N extends StatefulNotice>(notice: N): N => ({
  ...notice,
  state: {
    ...notice.state,
    read: true
  }
});

export const getNotice = <N extends NoticeWithContributor>(
  id: number,
  notices: N[]
): N | undefined => find((notice: N): boolean => notice.id === id, notices);

export const isNoticeValid = (notice: {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}): notice is NoticeWithContributor => {
  if (Object(notice) !== notice) return false;

  const { contributor, message } = notice;

  return (
    typeof message === 'string' &&
    Object(contributor) === contributor &&
    typeof contributor.name === 'string'
  );
};

export const warnIfNoticeInvalid = (notice: NoticeWithContributor): boolean => {
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

export const isRelayed = (
  subscriptionsIds: ContributorId[],
  notice?: StatefulNoticeWithContributor
) => notice?.contributor && !subscriptionsIds.includes(notice?.contributor.id);

export const getRelayer = (
  subscriptionsIds: Contributor['id'][],
  notice?: StatefulNoticeWithContributor
) =>
  isRelayed(subscriptionsIds, notice)
    ? notice?.relayers
        .filter(c => typeof c !== 'undefined')
        .find(relayer => subscriptionsIds.includes(relayer.id))
    : undefined;

export const getNoticeFieldsToTrack = ({
  id,
  url,
  strippedMessage,
  visibility,
  exampleMatchingUrl,
  ratings,
  created,
  modified,
  contributor
}: NoticeWithContributor) => ({
  id,
  url,
  strippedMessage,
  visibility,
  exampleMatchingUrl,
  ratings,
  created,
  modified,
  contributor: getContributorFieldsToTrack(contributor)
});
