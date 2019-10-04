import { Action, Dispatch } from 'redux';
import postRating from 'api/postRating';
import { AppAction, FeedbackOnNoticeAction } from 'app/actions';
import { RatingType } from 'app/lmem/rating';

// FIXME Maybe we should have consistent RatingType versus NoticeFeedbackType
interface RateableFeedbackAction {
  type: 'FEEDBACK_ON_NOTICE';
  payload: { id: number; feedback: RatingType };
}

const isRatingAction = (action: Action): action is RateableFeedbackAction =>
  action.type === 'FEEDBACK_ON_NOTICE' &&
  Object.values(RatingType).includes(
    (action as FeedbackOnNoticeAction).payload.feedback
  );

export default function() {
  return (next: Dispatch) => (action: AppAction) => {
    if (isRatingAction(action)) {
      const { id } = action.payload;
      chrome.tabs.query(
        { active: true, currentWindow: true },
        ([selectedTab]) => {
          if (selectedTab && selectedTab.url) {
            // FIXME uncatched failure
            postRating(id, selectedTab.url, action.payload
              .feedback as RatingType);
          }
        }
      );
    }

    return next(action);
  };
}
