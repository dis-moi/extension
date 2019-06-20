import { Dispatch } from 'redux';
import postRating from 'api/postRating';
import { AppAction } from 'app/actions';
import { FeedbackOnNoticeAction } from 'app/actions/notices';
import { RatingType } from 'app/lmem/rating';

const isRatingAction = (action: AppAction): action is FeedbackOnNoticeAction =>
  action.type === 'FEEDBACK_ON_NOTICE' &&
  Object.values(RatingType).includes(action.payload.feedback);

export default function() {
  return (next: Dispatch) => (action: AppAction) => {
    if (isRatingAction(action)) {
      const { id } = action.payload;
      chrome.tabs.query(
        { active: true, currentWindow: true },
        ([selectedTab]) => {
          if (selectedTab && selectedTab.url) {
            postRating(id, selectedTab.url, action.payload
              .feedback as RatingType);
          }
        }
      );
    }

    return next(action);
  };
}
