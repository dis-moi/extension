import { LOCATION_CHANGE } from 'connected-react-router';
import * as R from 'ramda';
import {
  dislikeNotice,
  dismissNotice,
  likeNotice,
  undislikeNotice,
  undismissNotice,
  unlikeNotice,
  markNoticeRead,
  confirmDismissNotice,
  confirmDislikeNotice,
  StatefulNoticeWithContributor
} from 'app/lmem/notice';
import {
  FEEDBACK_ON_NOTICE,
  MARK_NOTICE_READ,
  NOTICES_FOUND,
  NO_NOTICES_DISPLAYED,
  CONTEXT_NOT_TRIGGERED,
  AppAction,
  UNSUBSCRIBE
} from 'app/actions';

export type NoticesState = StatefulNoticeWithContributor[];

export default (state: NoticesState = [], action: AppAction): NoticesState => {
  switch (action.type) {
    case UNSUBSCRIBE:
      return R.reject(R.pathEq(['contributor', 'id'], action.payload), state);

    case NOTICES_FOUND:
      return action.payload.notices;

    case NO_NOTICES_DISPLAYED:
    case CONTEXT_NOT_TRIGGERED:
      return [];

    case MARK_NOTICE_READ:
      return state.map(notice =>
        notice.id === action.payload ? markNoticeRead(notice) : notice
      );

    case FEEDBACK_ON_NOTICE:
      switch (action.payload.feedback) {
        case 'dismiss':
          return state.map(notice =>
            notice.id === action.payload.id ? dismissNotice(notice) : notice
          );

        case 'confirmDismiss':
          return state.map(notice =>
            notice.id === action.payload.id
              ? confirmDismissNotice(notice)
              : notice
          );

        case 'undismiss':
          return state.map(notice =>
            notice.id === action.payload.id ? undismissNotice(notice) : notice
          );

        case 'like':
          return state.map(notice =>
            notice.id === action.payload.id ? likeNotice(notice) : notice
          );

        case 'unlike':
          return state.map(notice =>
            notice.id === action.payload.id ? unlikeNotice(notice) : notice
          );

        case 'dislike':
          return state.map(notice =>
            notice.id === action.payload.id ? dislikeNotice(notice) : notice
          );

        case 'confirmDislike':
          return state.map(notice =>
            notice.id === action.payload.id
              ? confirmDislikeNotice(notice)
              : notice
          );

        case 'undislike':
          return state.map(notice =>
            notice.id === action.payload.id ? undislikeNotice(notice) : notice
          );
      }
      return state;

    case LOCATION_CHANGE:
      return state.map(notice => ({
        ...notice,
        state: {
          ...notice.state,
          justDisliked: false,
          justLiked: false,
          justDismissed: false
        }
      }));

    default:
      return state;
  }
};
