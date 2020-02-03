/* eslint-disable no-console */
// Early imports with high priority stuff involved, such as event listeners creation
import prepareDraftPreview from '../lmem/draft-preview/main';
import { BACKEND_ORIGIN } from 'app/constants/origins';
import onInstalled from 'webext/onInstalled';
import onStartup from 'webext/onStartup';
import {
  updateDraftNotices,
  installed,
  updateRestrictedContexts,
  startup
} from 'app/actions';
import { configureSentryScope, initSentry } from 'app/utils/sentry';
import { store } from './store';
import fetchContentScript from './services/fetchContentScript';
import fetchRestrictedContexts from 'api/fetchRestrictedContexts';

initSentry();
configureSentryScope(scope => {
  scope.setTag('context', 'background');
});

const { NODE_ENV, UNINSTALL_ORIGIN } = process.env;

if (NODE_ENV !== 'production') {
  console.info('NODE_ENV', NODE_ENV);
}
console.info(`BACKEND_ORIGIN "${BACKEND_ORIGIN}"`);

fetchRestrictedContexts().then(restrictedContexts =>
  store.dispatch(updateRestrictedContexts(restrictedContexts))
);

// Load content code when the extension is loaded
fetchContentScript('/js/grabDraftNotices.js').then(contentCode =>
  prepareDraftPreview(chrome.tabs, contentCode, (draftOffers: {}) =>
    store.dispatch(updateDraftNotices(draftOffers))
  )
);

onInstalled.then(installedDetails => {
  if (typeof UNINSTALL_ORIGIN === 'string') {
    chrome.runtime.setUninstallURL(UNINSTALL_ORIGIN);
  }

  store.dispatch(installed(installedDetails));
});

onStartup.then(() => store.dispatch(startup()));
