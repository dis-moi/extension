import recommendationIsValid from '../lmem/recommendationIsValid';

export default function (
  tabs,
  {
    findMatchingMatchingContexts, getMatchingRecommendations, getDeactivatedWebsites, dispatch,
    contentCode, contentStyle, getOnInstalledDetails,
    getCriteria, getSelectedCriteria, getEditors, getExcludedEditors
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

          if (msg.type === 'redux-action')
            dispatch(msg.action);
        });

        tabPort.postMessage({
          type: 'init',
          style: contentStyle,
          deactivatedWebsites: [...getDeactivatedWebsites()],
          onInstalledDetails: getOnInstalledDetails(),
          criteria: getCriteria(),
          selectedCriteria: getSelectedCriteria(), // white list of criterias
          editors: getEditors(),
          excludedEditors: getExcludedEditors() // black list of editors
        });

        resolve(tabPort);
      });
    });

    matchingTabIdToPortP.set(tabId, tabPortP);

    return tabPortP;
  }


  function sendRecommendationsToTab(tabId, recos, matchingContexts) {
    console.log('before execute', tabId);

    const tabPortP = matchingTabIdToPortP.get(tabId) || createContentScriptAndPort(tabId);
    tabPortP
      .then(tabPort => tabPort.postMessage({
        type: 'recommendations',
        recommendations: recos,
        matchingContexts,
      }));
  }

  function fromRecoURLsToSendingToTab(recoUrls, tabId, matchingContexts) {
    return getMatchingRecommendations(recoUrls)
      .then(recos => recos.filter(recommendationIsValid))
      .then(recos => {
        if(recos.length >= 1) {
          sendRecommendationsToTab(tabId, recos, matchingContexts);
        }
      });
  }

  tabs.onCreated.addListener(({ id, url }) => {
    if (!url) return;

    const matchingMatchingContexts = findMatchingMatchingContexts(url);
    const recoUrls = matchingMatchingContexts.map(mmc => mmc.recommendation_url);

    if(recoUrls.length >= 1) {
      fromRecoURLsToSendingToTab(recoUrls, id, {
        matchingUrl: url,
      });
    }
  });

  tabs.onUpdated.addListener((id, { status, url: newUrl }, { url }) => {
    if (status === 'loading') {
      const matchingUrl = newUrl || url; // handle reloading

      const matchingMatchingContexts = findMatchingMatchingContexts(matchingUrl);
      const recoUrls = matchingMatchingContexts.map(mmc => mmc.recommendation_url);

      if (recoUrls.length >= 1) {
        fromRecoURLsToSendingToTab(recoUrls, id, {
          matchingUrl: url,
        });
      }
    }

    return matchingTabIdToPortP.delete(id);
  });

  tabs.onRemoved.addListener(id => {
    matchingTabIdToPortP.delete(id);
  });

}
