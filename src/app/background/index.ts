// Early imports with high priority stuff involved, such as event listeners creation
import loadHeap from '../../lib/heap';
import prepareDraftPreview from '../lmem/draft-preview/main';
import { LMEM_BACKEND_ORIGIN } from '../constants/origins';
import {
  dispatchInitialStateFromBackend,
  refreshMatchingContextsEvery
} from 'app/actions/kraftBackend';
import onInstalled from 'app/actions/install';
import updateDraftNotices from 'app/actions/updateDraftNotices';
import { configureSentryScope, initSentry } from '../utils/sentry';
import { getInstallationDetails } from './selectors/prefs';
import { store } from './store';
import fetchContentScript from './services/fetchContentScript';
import { BackgroundState } from './reducers';

initSentry();
configureSentryScope(scope => {
  scope.setTag('context', 'background');
});

if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV);
}
console.info(`LMEM_BACKEND_ORIGIN "${LMEM_BACKEND_ORIGIN}"`);

const setUninstallURL = (heapUserId: string) => {
  const uninstallOrigin = process.env.UNINSTALL_ORIGIN;
  if (typeof uninstallOrigin === 'string') {
    chrome.runtime.setUninstallURL(
      uninstallOrigin + '?u=' + encodeURIComponent(heapUserId || '-1')
    );
  }
};

const heapAppId = process.env.HEAP_APPID;
if (typeof heapAppId === 'string') {
  console.info(`Heap loading with appId "${heapAppId}"`);
  loadHeap(heapAppId)
    .catch(error => {
      console.warn('Could not load Heap Analytics', error);
    })
    .then(heap => {
      if (heap) {
        setUninstallURL(heap.userId);

        configureSentryScope(scope => {
          scope.setUser({ id: heap.userId });
        });
      }
    })
    .catch(error => {
      console.warn('Could not load set uninstall URL', error);
    });
} else {
  console.warn(
    'Heap analytics disabled: assuming "process.env.HEAP_APPID" is deliberately not defined.'
  );
}

// Load content code when the extension is loaded
fetchContentScript('/js/grabDraftNotices.js').then(contentCode =>
  prepareDraftPreview(chrome.tabs, contentCode, (draftOffers: {}) =>
    store.dispatch(updateDraftNotices(draftOffers))
  )
);

const state: BackgroundState = store.getState();
if (!getInstallationDetails(state).datetime) {
  onInstalled(process.env.ONBOARDING_ORIGIN)(store.dispatch);
}

dispatchInitialStateFromBackend()(store.dispatch);
// store initialization from the kraft server

const refreshInterval = Number(process.env.REFRESH_MC_INTERVAL);
if (refreshInterval > 0) {
  console.info(
    `Matching contexts will be refreshed every ${refreshInterval /
      1000 /
      60} minutes.`
  );
  refreshMatchingContextsEvery(refreshInterval)(store.dispatch);
} else {
  console.warn(
    'Matching contexts auto-refresh disabled:',
    'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
  );
}
