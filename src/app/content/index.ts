/* eslint-disable @typescript-eslint/no-var-requires, import/first, import/order */
import Logger from 'app/utils/Logger';
Logger.trace('Content script injected...');

if (window.location.href.match((process.env as AppEnv).PROFILES_ORIGIN)) {
  window.postMessage(
    'EXTENSION_INJECTED',
    (process.env as AppEnv).PROFILES_ORIGIN
  );
}

import { Scope } from '@sentry/browser';
import { AppEnv, CustomWindow } from 'types';
import i18n, { options } from 'i18n';

if (!(window as CustomWindow).__BULLES__CONTENT_SCRIPT_INJECTED__) {
  Logger.trace('Running content script ...');
  const {
    captureException,
    configureSentryScope,
    initSentry
  } = require('../utils/sentry');

  try {
    if ((process.env as AppEnv).PLATFORM !== 'firefox') {
      initSentry();
      configureSentryScope((scope: Scope) => {
        scope.setTag('context', 'content');
      });
    }

    const store = require('./store').default;
    const documentReady = require('../utils/documentReady').default;
    const externalClickHandler = require('./externalClickHandler').default;
    const handleExternalClick = externalClickHandler(store);

    (window as CustomWindow).__BULLES__CONTENT_SCRIPT_INJECTED__ = true;

    documentReady.then(() => {
      document.addEventListener('click', handleExternalClick);

      window.addEventListener('unload', () => {
        document.removeEventListener('click', handleExternalClick);
      });
    });

    i18n.init(options).then(() => {});
  } catch (error) {
    captureException(error);
  }
}
