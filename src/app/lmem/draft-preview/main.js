import { debounce } from 'lodash-es';

import {LMEM_BACKEND_ORIGIN} from '../../constants/origins';

function isRecommendationBackendURL(url) {
  const { origin, pathname, search } = new URL(url);

  return origin === LMEM_BACKEND_ORIGIN
    && pathname.includes('/admin')
    && search.includes('action=list') 
    && search.includes('entity=Recommendation');
}

export default function (tabs, contentCode, updateDraftRecommendations) {

  // The onCreated and onUpdated events lead to too many calls by default
  // Let's debounce 2secs
  const grabDraftRecommendations = debounce(function (tabId) {
    tabs.executeScript(tabId, {
      code: contentCode,
      runAt: 'document_end'
    }, () => {
      console.log('Finished loading drafts content script');
      const tabPort = tabs.connect(tabId);

      tabPort.onMessage.addListener((msg) => {
        console.log('message from draft grabing content script', msg);

        updateDraftRecommendations(msg);
      });
    });
  }, 2 * 1000, {leading: true, trailing: false});

  tabs.onCreated.addListener(({ id, url }) => {
    if (url && isRecommendationBackendURL(url)) {
      grabDraftRecommendations(id);
    }
  });

  tabs.onUpdated.addListener((id, { status, url: newUrl }, { url }) => {
    if (status === 'loading' && isRecommendationBackendURL(newUrl || url)) {
      grabDraftRecommendations(id);
    }
  });
}