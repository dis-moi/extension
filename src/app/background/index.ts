// Early imports with high priority stuff involved, such as event listeners creation
import loadHeap from '../../lib/heap';
import prepareDraftPreview from '../lmem/draft-preview/main';
import { LMEM_BACKEND_ORIGIN } from 'app/constants/origins';
import onInstalled from 'webext/onInstalled';
import updateDraftNotices from 'app/actions/updateDraftNotices';
import { configureSentryScope, initSentry } from 'app/utils/sentry';
import { store } from './store';
import fetchContentScript from './services/fetchContentScript';
import { installed } from '../actions';

initSentry();
configureSentryScope(scope => {
  scope.setTag('context', 'background');
});

const { NODE_ENV, UNINSTALL_ORIGIN, HEAP_APPID } = process.env;

if (NODE_ENV !== 'production') {
  console.info('NODE_ENV', NODE_ENV);
}
console.info(`LMEM_BACKEND_ORIGIN "${LMEM_BACKEND_ORIGIN}"`);

const setUninstallURL = (heapUserId: string) => {
  const uninstallOrigin = UNINSTALL_ORIGIN;
  if (typeof uninstallOrigin === 'string') {
    chrome.runtime.setUninstallURL(
      uninstallOrigin + '?u=' + encodeURIComponent(heapUserId || '-1')
    );
  }
};

const heapAppId = HEAP_APPID;
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

onInstalled.then(installedDetails =>
  store.dispatch(installed(installedDetails))
);
