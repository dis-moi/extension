/* eslint-disable no-console */
// Early imports with high priority stuff involved, such as event listeners creation
import { Store } from 'redux';
import { BACKEND_ORIGIN } from 'libs/api/constants/origins';
import onInstalled from 'libs/webext/onInstalled';
import onStartup from 'libs/webext/onStartup';
import {
  i18nReady,
  installed,
  optionsRequested,
  startup
} from 'libs/store/actions';
import { configureSentryScope, initSentry } from 'libs/utils/sentry';
import { OPTIONS_MENU_ITEM_ID } from 'libs/domain/tab';
import i18n, { options } from 'libs/i18n';
import Logger from 'libs/utils/Logger';
import { connect } from 'libs/store/actions/connection';
import { store } from './store';

type Port = browser.runtime.Port;

initSentry();
configureSentryScope(scope => {
  scope.setTag('context', 'background');
});

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') {
  console.info('NODE_ENV', NODE_ENV);
}
console.info(`BACKEND_ORIGIN "${BACKEND_ORIGIN}"`);

onInstalled.then(installedDetails =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  store.dispatch(installed(installedDetails))
);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
onStartup.then(() => store.dispatch(startup()));
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
i18n.init(options).then(() => store.dispatch(i18nReady()));

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const handleConnect = (port: Port) => {
  Logger.info('onConnect received, dispatching connect(port)');
  return (store as Store).dispatch(connect(port));
};

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
      title: i18n.t('tab.sources_link'),
      contexts: ['action']
    });
  });

browser.contextMenus.onClicked.addListener(onClickData => {
  if (onClickData.menuItemId === OPTIONS_MENU_ITEM_ID) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    store.dispatch(optionsRequested());
  }
});
