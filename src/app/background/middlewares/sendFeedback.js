import {
  DISMISS_NOTICE,
  UNDISMISS_NOTICE,
  LIKE_NOTICE,
  UNLIKE_NOTICE,
  DISLIKE_NOTICE,
  UNDISLIKE_NOTICE,
  REPORT_NOTICE
} from '../../constants/ActionTypes';

import { LMEM_BACKEND_ORIGIN } from '../../constants/origins';

const actionTypeToFeedbackType = {
  [DISMISS_NOTICE]: 'dismiss',
  [UNDISMISS_NOTICE]: 'undismiss',
  [LIKE_NOTICE]: 'like',
  [UNLIKE_NOTICE]: 'unlike',
  [DISLIKE_NOTICE]: 'dislike',
  [UNDISLIKE_NOTICE]: 'undislike',
  [REPORT_NOTICE]: 'report',
};

export function makeRecoFeedback(type, url) {
  const datetime = new Date().toISOString();

  const feedback = actionTypeToFeedbackType[type];

  if (!feedback) {
    throw new ReferenceError(`Wrong feedback type: ${type}`);
  }

  return {
    feedback,
    contexts: {
      datetime,
      url,
    }
  };
}

/* eslint-disable indent, implicit-arrow-linebreak, no-multi-spaces */
const isUserToNoticeAction = ({ type }) =>
   type === DISMISS_NOTICE || type === UNDISMISS_NOTICE
|| type === LIKE_NOTICE    || type === UNLIKE_NOTICE
|| type === DISLIKE_NOTICE || type === UNDISLIKE_NOTICE
|| type === REPORT_NOTICE;

export default function (store){
  return next => (action) => {
    const { type, payload } = action;

    if (isUserToNoticeAction(action)) {
      const { id } = payload;
      const reqUrl = LMEM_BACKEND_ORIGIN + '/api/v2/recommendations/' + id + '/feedbacks';
      new Promise((res) => {
        chrome.tabs.query({
          active: true,
          currentWindow: true,
        }, ([selectedTab]) => res(selectedTab.url));
      })
        .then((tabUrl) => {
        const body = JSON.stringify(makeRecoFeedback(type, tabUrl));

        fetch(reqUrl, { method: 'POST', body })
          .then(response => console.log('RESPONSE', response))
          .catch(error => console.error(`Error in ${reqUrl}`, error));
      });
    }

    return next(action);
  };
}
