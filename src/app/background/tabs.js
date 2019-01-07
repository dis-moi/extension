import recommendationIsValid from '../lmem/recommendationIsValid';
import { contextTriggered, recoDisplayed, recoDismissed } from './actions/tabs';
import init from './actions/init';
import { recommendationFound } from '../content/actions/recommendations';
import { PUBLISHED_FROM_TAB } from '../constants/ActionTypes';

export const matchingTabIdToPortM = new Map();

export function makeTabs(
  tabs,
  {
    findTriggeredContexts, getMatchingRecommendations, dispatch,
    contentCode, getOnInstalledDetails, getCriteria, getEditors, getDismissed, getApproved,
  }
) {

  function createContentScriptAndPort(tabId) {
    const tabPortP = new Promise((resolve) => {
      tabs.executeScript(tabId, {
        code: contentCode,
        runAt: 'document_end'
      }, () => {
        const tabPort = chrome.tabs.connect(tabId);
        tabPort.onDisconnect.addListener(() => {
          console.log('port in background was disconnected for tab', tabId);
          matchingTabIdToPortM.delete(tabId);
        });

        tabPort.onMessage.addListener((action) => {
          const { type, payload } = action;
          console.log('message from content script', action);

          if (type === PUBLISHED_FROM_TAB) dispatch(payload);
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


        tabPort.postMessage(init({
          onInstalledDetails: getOnInstalledDetails(),
          criteria,
          editors
        }));

        resolve(tabPort);
      });
    });

    matchingTabIdToPortM.set(tabId, tabPortP);

    return tabPortP;
  }

  function sendRecommendationsToTab(tabId, recos) {
    // console.log('before execute', tabId);

    const tabPortP = matchingTabIdToPortM.get(tabId) || createContentScriptAndPort(tabId);

    const approvedRecos = getApproved();
    const recommendations = recos.map((reco) => {
      return Object.assign(reco, {
        isApproved: approvedRecos.has(reco.id),
      });
    });

    tabPortP
      .then(tabPort => tabPort.postMessage(recommendationFound(recommendations)));
  }

  function fromRecoURLsToSendingToTab(recoUrls, tabId, trigger) {
    return getMatchingRecommendations(recoUrls)
      .then(recos => recos.filter((reco) => { // validate recos
        const isValid = recommendationIsValid(reco);
        if (!isValid) console.warn('Invalid recommendation not displayed:', reco);
        return isValid;
      }))
      .then((recos) => { // filter dismissed recos
        const dismissed = getDismissed();

        const toDisplayRecos = recos.filter((reco) => {
          if (dismissed.has(reco.id)) dispatch(recoDismissed(reco, trigger));
          else dispatch(recoDisplayed(reco, trigger));

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
      dispatch(contextTriggered(triggeredContexts, url));
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

  tabs.onRemoved.addListener((id) => {
    matchingTabIdToPortM.delete(id);
  });

}
