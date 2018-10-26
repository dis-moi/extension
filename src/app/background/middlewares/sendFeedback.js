import {
  DISMISS_RECO,
  APPROVE_RECO,
  UNAPPROVE_RECO,
  REPORT_RECO
} from '../../constants/ActionTypes';

import { LMEM_BACKEND_ORIGIN } from '../../constants/origins';

export function makeRecoFeedback(type, url) {
  const datetime = new Date().toISOString();

  let feedback;
  switch (type) {
    case DISMISS_RECO:
      feedback = 'dismiss';
      break;
    case APPROVE_RECO:
      feedback = 'approve';
      break;
    case UNAPPROVE_RECO:
      feedback = 'unapprove';
      break;
    case REPORT_RECO:
      feedback = 'report';
      break;
    default:
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

export default function (store){
  return next => (action) => {

    switch (action.type){
      case DISMISS_RECO:
      case APPROVE_RECO:
      case UNAPPROVE_RECO:
      case REPORT_RECO:

        const reqUrl = LMEM_BACKEND_ORIGIN + '/api/v2/recommendations/' + action.id + '/feedbacks';
        const tabUrlP = new Promise((res) => {
          chrome.tabs.query({
            active: true,
            currentWindow: true,
          }, ([selectedTab]) => res(selectedTab.url));
        });
        
        tabUrlP.then((tabUrl) => {
          const body = JSON.stringify(makeRecoFeedback(action.type, tabUrl));

          fetch(reqUrl, { method: 'POST', body })
            .then(response => console.log('RESPONSE', response))
            .catch(error => console.error(`Error in ${reqUrl}`, error));
        });
        break;
      
      default:
        break;
    }

    return next(action);
  };
}