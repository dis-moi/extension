/* eslint-disable no-console */
import {
  init,
  configureScope,
  Scope,
  Severity,
  captureMessage as sentryCaptureMessage,
  captureException as sentryCaptureException
} from '@sentry/browser';
import { version } from '../../../package.json';

export const initSentry = () => {
  const blacklist = ['GlobalHandlers', 'ReportingObserver'];
  if (process.env.SENTRY_ENABLE) {
    init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: `${version}-${process.env.BUILD}`,
      // defaultIntegrations: false,
      integrations: integrations =>
        integrations.filter(i => !blacklist.includes(i.name))
    });
  }
};

export { Scope };
type ScopeCallback = (scope: Scope) => void;
export const configureSentryScope = (scopeCallback: ScopeCallback) => {
  if (process.env.SENTRY_ENABLE) {
    configureScope(scopeCallback);
  }
};

export const captureMessage = (
  message: string,
  level?: Severity
): string | undefined => {
  if (process.env.SENTRY_ENABLE) {
    return sentryCaptureMessage(message, level);
  } else {
    switch (level) {
      case Severity.Fatal:
      case Severity.Error:
      case Severity.Critical:
        console.error(message);
        break;
      case Severity.Warning:
        console.warn(message);
        break;

      case Severity.Info:
        console.info(message);
        break;
      case Severity.Debug:
        console.debug(message);
        break;
      case Severity.Log:
      default:
        console.log(message);
        break;
    }
  }
};

export const captureException = (exception: unknown): string | undefined => {
  if (process.env.SENTRY_ENABLE) {
    return sentryCaptureException(exception);
  } else {
    console.error(exception);
  }
};
