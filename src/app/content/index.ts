/* eslint-disable @typescript-eslint/no-var-requires, import/first */
import Logger from 'app/utils/Logger';
Logger.info('Content script injected...');

import { Scope } from '@sentry/browser';

if (!(window as CustomWindow).__BULLES__CONTENT_SCRIPT_INJECTED__) {
  Logger.info('Running content script ...');
  const {
    captureException,
    configureSentryScope,
    initSentry
  } = require('../utils/sentry');

  try {
    if ((process.env as AppEnv).BUILD !== 'firefox') {
      initSentry();
      configureSentryScope((scope: Scope) => {
        scope.setTag('context', 'content');
      });
    }

    require('typeface-lato');
    require('typeface-sedgwick-ave');
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
  } catch (error) {
    captureException(error);
  }
}
