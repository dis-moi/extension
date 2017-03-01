import recommendationIsValid from '../lmem/recommendationIsValid';
import {
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  DISMISS_RECO,
  APPROVE_RECO,
  UNAPPROVE_RECO,
  REPORT_RECO
} from '../constants/ActionTypes';

import { contextTriggered, recoDisplayed, recoDismissed } from '../background/actions/tabs';

import { LMEM_BACKEND_ORIGIN } from '../constants/origins';

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

export function makeTabs(
  tabs,
  {
    findTriggeredContexts, refreshMatchingContexts, getMatchingRecommendations, dispatch,
    contentCode, contentStyle, getOnInstalledDetails, getCriteria, getEditors, getDismissed, getApproved,
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

          if (msg.type === 'redux-action') {
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
              case UNAPPROVE_RECO:
              case REPORT_RECO:
                const reqUrl = LMEM_BACKEND_ORIGIN + '/api/v2/recommendations/' + msg.action.id + '/feedbacks';
                const tabUrlP = new Promise(res => {
                  chrome.tabs.query({
                    active: true,
                    currentWindow: true,
                  }, ([selectedTab]) => res(selectedTab.url));
                });
                
                tabUrlP.then(tabUrl => {
                  const body = JSON.stringify(makeRecoFeedback(msg.action.type, tabUrl));

                  fetch(reqUrl, { method: 'POST', body })
                    .then(response => console.log('RESPONSE', response))
                    .catch(error => console.error(`Error in ${reqUrl}`, error));
                });
                break;
              
              default:
                break;
            }
          }
        });

        const criteria = getCriteria().reduce((acc, criterionMap, slug) => {
          const criterion = {
            isSelected: criterionMap.get('isSelected'),
            label: criterionMap.get('label'),
            slug,
          };
          return Object.assign(acc, {[slug]: criterion});
        }, {});

        const editors = getEditors().reduce((acc, editorsMap, id) => {
          const editor = {
            isExcluded: editorsMap.get('isExcluded'),
            label: editorsMap.get('label'),
            url: editorsMap.get('url'),
            id,
          };
          return Object.assign(acc, {[id]: editor});
        }, {});

        tabPort.postMessage({
          type: 'init',
          style: contentStyle,
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
    // console.log('before execute', tabId);

    const tabPortP = matchingTabIdToPortP.get(tabId) || createContentScriptAndPort(tabId);

    const approvedRecos = getApproved();
    const recommendations = recos.map(reco => {
      return Object.assign(reco, {
        isApproved: approvedRecos.has(reco.id),
      });
    });

    tabPortP
      .then(tabPort => tabPort.postMessage({
        type: 'recommendations',
        recommendations,
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
  });

  tabs.onRemoved.addListener(id => {
    matchingTabIdToPortP.delete(id);
  });

}
