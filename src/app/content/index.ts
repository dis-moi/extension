import Logger from 'libs/utils/Logger';
import { Scope } from '@sentry/browser';
import { CustomWindow } from 'types';
import i18n, { options } from 'libs/i18n';
import {
  captureException,
  configureSentryScope,
  initSentry
} from 'libs/utils/sentry';
import store from './store';
import documentReady from 'libs/utils/documentReady';
import externalClickHandler from './externalClickHandler';

export function init() {
  Logger.trace('Content script injected...');

  if (window.location.href.match(process.env.PROFILES_ORIGIN as string)) {
    window.postMessage(
      'EXTENSION_INJECTED',
      process.env.PROFILES_ORIGIN as string
    );
  }

  if (!(window as CustomWindow).__BULLES__CONTENT_SCRIPT_INJECTED__) {
    Logger.trace('Running content script ...');

    try {
      if (process.env.PLATFORM !== 'firefox') {
        initSentry();
        configureSentryScope((scope: Scope) => {
          scope.setTag('context', 'content');
        });
      }

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
}
