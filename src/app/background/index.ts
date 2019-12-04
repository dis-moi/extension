/* eslint-disable no-console */
// Early imports with high priority stuff involved, such as event listeners creation
import { BACKEND_ORIGIN } from 'app/constants/origins';
import onInstalled from 'webext/onInstalled';
import { installed, updateRestrictedContexts } from 'app/actions';
import { configureSentryScope, initSentry } from 'app/utils/sentry';
import { store } from './store';
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

onInstalled.then(installedDetails => {
  if (typeof UNINSTALL_ORIGIN === 'string') {
    chrome.runtime.setUninstallURL(UNINSTALL_ORIGIN);
  }

  store.dispatch(installed(installedDetails));
});
