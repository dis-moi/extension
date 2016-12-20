import sendReq from '../../../tools/sendReq';

import recommendationIsValid from '../lmem/recommendationIsValid';
import {
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  DISMISS_RECO,
  APPROVE_RECO,
  REPORT_RECO
} from '../constants/ActionTypes';

import { contextTriggered, recoDisplayed, recoDismissed } from '../actions/tabs';

import { LMEM_BACKEND_ORIGIN } from '../constants/origins';

export function makeRecoFeedback(type, url){ // NEEDS TESTING
  const feedback = type.split('_')[0].toLowerCase();
  const datetime = new Date().toISOString();

  return {
    feedback,
    contexts: {
      datetime,
      url
    }
  };
}

export function makeTabs(
  tabs,
  {
    findTriggeredContexts, refreshMatchingContexts, getMatchingRecommendations, getDeactivatedWebsites, dispatch,
    contentCode, contentStyle, getOnInstalledDetails, getCriteria, getEditors, getDismissed
  }
) {

  const matchingTabIdToPortP = new Map();

  function createContentScriptAndPort(tabId) {
    const tabPortP = new Promise(resolve => {
      tabs.executeScript(tabId, {
        code: contentCode,
        runAt: 'document_end'
      }, () => {
        const tabPort = chrome.tabs.connect(tabId);
        tabPort.onDisconnect.addListener(() => {
          console.log('port in background was disconnected for tab', tabId);
          matchingTabIdToPortP.delete(tabId);
        });

        tabPort.onMessage.addListener(msg => {
          console.log('message from content script', msg);

          if (msg.type === 'redux-action'){
            dispatch(msg.action);

            switch (msg.action.type){
              
              // ask for matchingContexts update
              case EXCLUDE_EDITOR:
              case INCLUDE_EDITOR:
              case SELECT_CRITERION:
              case UNSELECT_CRITERION:
                refreshMatchingContexts();
                break;

              // send feedback
              case DISMISS_RECO:
              case APPROVE_RECO:
              case REPORT_RECO:
                const reqUrl = LMEM_BACKEND_ORIGIN + '/api/v2/recommendations/' + msg.action.id + '/feedbacks';
                const tabUrlP = new Promise(res => chrome.tabs.getSelected(null, tab => res(tab.url)));
                
                tabUrlP.then(tabUrl => {
                  const payload = makeRecoFeedback(msg.action.type, tabUrl);

                  sendReq('POST', reqUrl, payload)
                  .then(response => {
                    console.log('RESPONSE', response);
                  })
                  .catch(error => {
                    console.error('Error in /api/v2/recommendations/' + msg.action.id + '/feedbacks', error);
                  });
                });
                break;
              
              default:
            }
          }
        });

        // transform Maps to objects to be sent via tabPort
        let criteria = {};
        let editors = {};

        getCriteria().forEach((criterion, slug) => {
          let critObj = {};

          criterion.forEach((v, k) => {
            critObj[k] = v;
          });

          criteria[slug] = critObj;
        });

        getEditors().forEach((editor, id) => {
          let editObj = {};

          editor.forEach((v, k) => {
            editObj[k] = v;
          });

          editors[id] = editObj;
        });

        tabPort.postMessage({
          type: 'init',
          style: contentStyle,
          deactivatedWebsites: [...getDeactivatedWebsites()],
          onInstalledDetails: getOnInstalledDetails(),
          criteria,
          editors
        });

        resolve(tabPort);
      });
    });

    matchingTabIdToPortP.set(tabId, tabPortP);

    return tabPortP;
  }


  function sendRecommendationsToTab(tabId, recos) {
    console.log('before execute', tabId);

    const tabPortP = matchingTabIdToPortP.get(tabId) || createContentScriptAndPort(tabId);
    tabPortP
      .then(tabPort => tabPort.postMessage({
        type: 'recommendations',
        recommendations: recos,
      }));
  }

  function fromRecoURLsToSendingToTab(recoUrls, tabId, trigger) {
    return getMatchingRecommendations(recoUrls)
    .then(recos => recos.filter(reco => { // validate recos
      const isValid = recommendationIsValid(reco);
      if (!isValid) console.warn('Invalid recommendation not displayed:', reco);
      return isValid;
    }))
    .then(recos => { // filter dismissed recos
      const dismissed = getDismissed();

      const toDisplayRecos = recos.filter(reco => {
        if (dismissed.has(reco.id))
          dispatch(recoDismissed(trigger, reco));
        else
          dispatch(recoDisplayed(trigger, reco));

        return !dismissed.has(reco.id);
      });

      if(toDisplayRecos.length >= 1) {
        sendRecommendationsToTab(tabId, toDisplayRecos);
      }
    });
  }

  function triggerFromTabUrl(id, url){
    const triggeredContexts = findTriggeredContexts(url);
    const recoUrls = triggeredContexts.map(tc => tc.recommendation_url);

    if(recoUrls.length >= 1) {
      dispatch(contextTriggered({url}, triggeredContexts));
      fromRecoURLsToSendingToTab(recoUrls, id, {url});
    }
  }

  tabs.onCreated.addListener(({ id, url }) => {
    if (!url) return;

    triggerFromTabUrl(id, url);
  });

  tabs.onUpdated.addListener((id, { status, url: newUrl }, { url }) => {
    if (status === 'loading') {
      const matchingUrl = newUrl || url; // handle reloading

      triggerFromTabUrl(id, matchingUrl);
    }

    return matchingTabIdToPortP.delete(id);
  });

  tabs.onRemoved.addListener(id => {
    matchingTabIdToPortP.delete(id);
  });

}
