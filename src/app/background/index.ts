/* eslint-disable no-console */
// Early imports with high priority stuff involved, such as event listeners creation
import { BACKEND_ORIGIN } from 'app/constants/origins';
import onInstalled from 'webext/onInstalled';
import onStartup from 'webext/onStartup';
import { installed, optionsRequested, startup } from 'app/actions';
import { configureSentryScope, initSentry } from 'app/utils/sentry';
import { store } from './store';
import { connect } from 'app/store/actions/connection';
import { OPTIONS_MENU_ITEM_ID } from 'app/lmem/tab';

type Port = browser.runtime.Port;

initSentry();
configureSentryScope(scope => {
  scope.setTag('context', 'background');
});

const { NODE_ENV, UNINSTALL_ORIGIN } = process.env;

if (NODE_ENV !== 'production') {
  console.info('NODE_ENV', NODE_ENV);
}
console.info(`BACKEND_ORIGIN "${BACKEND_ORIGIN}"`);

onInstalled.then(installedDetails => {
  if (typeof UNINSTALL_ORIGIN === 'string') {
    browser.runtime.setUninstallURL(UNINSTALL_ORIGIN);
  }

  store.dispatch(installed(installedDetails));
});

onStartup.then(() => store.dispatch(startup()));

const handleConnect = (port: Port) => store.dispatch(connect(port));

browser.runtime.onConnectExternal.addListener(handleConnect);
browser.runtime.onConnect.addListener(handleConnect);

// https://stackoverflow.com/questions/37000136/check-if-item-is-already-in-the-context-menu
browser.contextMenus
  .remove(OPTIONS_MENU_ITEM_ID)
  .catch(() => {
    // do nothing
  })
  .finally(() => {
    browser.contextMenus.create({
      id: OPTIONS_MENU_ITEM_ID,
      title: 'Informateurs et abonnements',
      contexts: ['browser_action']
    });
  });

browser.contextMenus.onClicked.addListener(onClickData => {
  if (onClickData.menuItemId === OPTIONS_MENU_ITEM_ID) {
    store.dispatch(optionsRequested());
  }
});
