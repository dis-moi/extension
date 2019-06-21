import { Dispatch } from 'redux';
import postRating from 'api/lmem/postRating';
import { AppAction } from '../../actions';
import { FeedbackOnNoticeAction, feedbackType } from '../../actions/notices';

/* eslint-disable indent, implicit-arrow-linebreak, no-multi-spaces */
const isUserToNoticeAction = (
  action: AppAction
): action is FeedbackOnNoticeAction => action.type === 'FEEDBACK_ON_NOTICE';

export default function() {
  return (next: Dispatch) => (action: AppAction) => {
    if (isUserToNoticeAction(action)) {
      const { id } = action.payload;
      chrome.tabs.query(
        { active: true, currentWindow: true },
        ([selectedTab]) => {
          if (selectedTab && selectedTab.url) {
            postRating(id, selectedTab.url, action.payload.feedback);
          }
        }
      );
    }

    return next(action);
  };
}
