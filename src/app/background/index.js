/* eslint global-require: "off" */

// Early imports with high priority stuff involved, such as event listeners creation
import onInstalled from './actions/install';
import loadHeap from '../../lib/heap';

import configureStore from './store/configureStore';
import { getOnInstalledDetails } from './selectors/prefs';

import prepareDraftPreview from '../lmem/draft-preview/main';

import {
  dispatchInitialStateFromBackend,
  refreshMatchingContextsEvery,
} from './actions/kraftBackend';
import updateDraftRecommendations from './actions/updateDraftRecommendations';

import {LMEM_BACKEND_ORIGIN } from '../constants/origins';
import fetchContentScript from './services/fetchContentScript';

if(process.env.NODE_ENV !== 'production'){
  console.info('NODE_ENV', process.env.NODE_ENV);
}
console.info(`LMEM_BACKEND_ORIGIN "${LMEM_BACKEND_ORIGIN}"`);

const heapAppId = process.env.HEAP_APPID;
if (typeof heapAppId === 'string') {
  console.info(`Heap loading with appId "${heapAppId}"`);
  loadHeap(heapAppId).then((heap) => {
    const uninstallOrigin = process.env.UNINSTALL_ORIGIN;
    if (typeof uninstallOrigin === 'string') {
      chrome.runtime.setUninstallURL(uninstallOrigin + '?u=' + encodeURIComponent(heap.userId));
    }
  });
}
else {
  console.warn('Heap analytics disabled: assuming "process.env.HEAP_APPID" is deliberately not defined.');
}

// Load content code when the extension is loaded
const draftRecoContentCodeP = fetchContentScript('/js/grabDraftRecommendations.js');

configureStore((store) => {
  window.store = store;
  // Expose the store to extension's windows
  window.getStore = () => {
    let unsubscribeList = [];
    return {
      store: Object.assign({
        subscribe(...args) {
          const unsubscribe = store.subscribe(...args);
          unsubscribeList.push(unsubscribe);
          return unsubscribe;
        },
        store
      }),
      unsubscribe: () => {
        unsubscribeList.forEach((unsubscriber) => { unsubscriber(); });
      }
    };
  };

  draftRecoContentCodeP
    .then(contentCode => prepareDraftPreview(
      chrome.tabs,
      contentCode,
      (draftOffers => store.dispatch(updateDraftRecommendations(draftOffers)))
    ));

  if (getOnInstalledDetails(store.getState()).isEmpty()) {
    const onboardingUrl = process.env.ONBOARDING_ORIGIN;
    store.dispatch(onInstalled({ onboardingUrl }));
  }

  store.dispatch(dispatchInitialStateFromBackend()); // store initialization from the kraft server

  const refreshInterval = Number(process.env.REFRESH_MC_INTERVAL);
  if (refreshInterval > 0) {
    console.info(`Matching contexts will be refreshed every ${refreshInterval / 1000 / 60} minutes.`);
    store.dispatch(refreshMatchingContextsEvery(refreshInterval));
  }
  else console.warn(
    'Matching contexts auto-refresh disabled:',
    'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
  );

}, true);

