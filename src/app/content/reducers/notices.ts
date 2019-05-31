import { LOCATION_CHANGE } from 'connected-react-router';
import {
  dislikeNotice,
  dismissNotice,
  likeNotice,
  undislikeNotice,
  undismissNotice,
  unlikeNotice,
  StatefulNotice,
  readNotice
} from '../../lmem/notice';
import { AppAction } from 'app/actions';

export type NoticesState = StatefulNotice[];

export default (state: NoticesState = [], action: AppAction): NoticesState => {
  switch (action.type) {
    case 'NOTICES_FOUND':
      return action.payload.notices;

    case 'READ_NOTICE':
      return state.map(notice =>
        notice.id === action.payload ? readNotice(notice) : notice
      );

    case 'FEEDBACK_ON_NOTICE':
      switch (action.payload.feedback) {
        case 'dismiss':
          return state.map(notice =>
            notice.id === action.payload.id ? dismissNotice(notice) : notice
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
