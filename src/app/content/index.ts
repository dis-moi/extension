/* eslint-disable @typescript-eslint/no-var-requires */
import { Scope } from '@sentry/browser';

if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  const {
    captureException,
    configureSentryScope,
    initSentry
  } = require('../utils/sentry');

  try {
    try {
      initSentry();

      configureSentryScope((scope: Scope) => {
        scope.setTag('context', 'content');
      });
    } catch (error) {
      console.warn('Could not init Sentry in contentScript', error);
    }

    require('typeface-lato');
    require('typeface-sedgwick-ave');
    const store = require('./store').default;
    const documentReady = require('../utils/documentReady').default;
    const externalClickHandler = require('./externalClickHandler').default;
    const handleExternalClick = externalClickHandler(store);

    (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;

    documentReady.then(() => {
      document.addEventListener('click', handleExternalClick);

      window.addEventListener('unload', () => {
        document.removeEventListener('click', handleExternalClick);
      });
    });
  } catch (e) {
    captureException(e);
  }
}
