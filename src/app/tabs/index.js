import recommendationIsValid from '../lmem/recommendationIsValid';
import {
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR
} from '../constants/ActionTypes';

import { contextTriggered, recoDisplayed, recoDismissed } from '../actions/tab';

export default function (
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

            if (msg.action.type === EXCLUDE_EDITOR || msg.action.type === INCLUDE_EDITOR ||
              msg.action.type === SELECT_CRITERION || msg.action.type === UNSELECT_CRITERION)
              refreshMatchingContexts();
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
      let dismissed = getDismissed();

      let toDisplayRecos = recos.filter(reco => {
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
