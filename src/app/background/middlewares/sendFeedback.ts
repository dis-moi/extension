import { LMEM_BACKEND_ORIGIN } from '../../constants/origins';
import { AppAction } from '../../actions';
import { Dispatch } from 'redux';
import {
  FeedbackOnNoticeAction,
  feedbackType
} from '../../actions/recommendations';

export function makeRecoFeedback(feedback: feedbackType, url: string) {
  const datetime = new Date().toISOString();

  return {
    feedback,
    contexts: {
      datetime,
      url
    }
  };
}

/* eslint-disable indent, implicit-arrow-linebreak, no-multi-spaces */
const isUserToNoticeAction = (
  action: AppAction
): action is FeedbackOnNoticeAction => action.type === 'FEEDBACK_ON_NOTICE';

export default function() {
  return (next: Dispatch) => (action: AppAction) => {
    if (isUserToNoticeAction(action)) {
      const { id } = action.payload;
      const reqUrl =
        LMEM_BACKEND_ORIGIN + '/api/v2/recommendations/' + id + '/feedbacks';
      new Promise<string>(resolve => {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true
          },
          ([selectedTab]) => resolve(selectedTab.url)
        );
      }).then((tabUrl: string) => {
        const body = JSON.stringify(
          makeRecoFeedback(action.payload.feedback, tabUrl)
        );

        fetch(reqUrl, { method: 'POST', body })
          .then(response => console.log('RESPONSE', response))
          .catch(error => console.error(`Error in ${reqUrl}`, error));
      });
    }

    return next(action);
  };
}
