import { LOCATION_CHANGE } from 'connected-react-router';
import {
  markNoticeRead,
  findAndTransformNotice,
  StatefulNotice,
  findNoticeAndApplyFeedback
} from 'app/lmem/notice';
import { AppAction } from 'app/actions';

export type NoticesState = StatefulNotice[];

export default (state: NoticesState = [], action: AppAction): NoticesState => {
  switch (action.type) {
    case 'NOTICES_FOUND':
      return action.payload.notices;

    case 'MARK_NOTICE_READ':
      return findAndTransformNotice(action.payload, markNoticeRead)(state);

    case 'FEEDBACK_ON_NOTICE':
      return findNoticeAndApplyFeedback(
        action.payload.id,
        action.payload.feedback
      )(state);

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
