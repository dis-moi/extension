import {
  NOTICES_FOUND, DISMISS_NOTICE, UNDISMISS_NOTICE, LIKE_NOTICE, UNLIKE_NOTICE, DISLIKE_NOTICE, UNDISLIKE_NOTICE, REPORT_NOTICE,
} from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';
import createBackgroundAction from '../createBackgroundAction';

const withId = id => ({ id })

export const noticesFound = createAction(
  NOTICES_FOUND,
  (notices = []) => ({ notices }),
  tab => ({ tab })
);
export const dismissNotice = createBackgroundAction(DISMISS_NOTICE, withId);
export const undismissNotice = createBackgroundAction(UNDISMISS_NOTICE, withId);
export const likeNotice = createBackgroundAction(LIKE_NOTICE, withId);
export const unlikeNotice = createBackgroundAction(UNLIKE_NOTICE, withId);
export const dislikeNotice = createBackgroundAction(DISLIKE_NOTICE, withId);
export const undislikeNotice = createBackgroundAction(UNDISLIKE_NOTICE, withId);
export const reportNotice = createBackgroundAction(REPORT_NOTICE, withId);
