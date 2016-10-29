import recommendationIsValid from '../lmem/recommendationIsValid';

export default function (
  tabs,
  {
    findMatchingMatchingContexts, getMatchingRecommendations, getDeactivatedWebsites, dispatch,
    contentCode, contentStyle, getOnInstalledDetails
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
          onInstalledDetails: getOnInstalledDetails()
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
        recommendations: recos
      }));
  }

  function fromRecoURLsToSendingToTab(recoUrls, tabId){
    return getMatchingRecommendations(recoUrls)
      .then(recos => recos.filter(recommendationIsValid))
      .then(recos => {
        if(recos.length >= 1){
          sendRecommendationsToTab(tabId, recos);
        }
      });
  }


  tabs.onCreated.addListener(({ id, url }) => {
    const matchingMatchingContexts = findMatchingMatchingContexts(url);
    const recoUrls = matchingMatchingContexts.map(mmc => mmc.recommendation_url);

    if(recoUrls.length >= 1){
      fromRecoURLsToSendingToTab(recoUrls, id);
    }

  });

  tabs.onUpdated.addListener((id, { url: newUrl }, { url }) => {
    const matchingMatchingContexts = findMatchingMatchingContexts(newUrl || url);
    const recoUrls = matchingMatchingContexts.map(mmc => mmc.recommendation_url);

    if(recoUrls.length >= 1){
      fromRecoURLsToSendingToTab(recoUrls, id);
    }
    else {
      matchingTabIdToPortP.delete(id);
    }
  });

  tabs.onRemoved.addListener(id => {
    matchingTabIdToPortP.delete(id);
  });

}
