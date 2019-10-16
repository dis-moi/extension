import {
  init,
  configureScope,
  Scope,
  Severity,
  captureMessage as sentryCaptureMessage,
  captureException as sentryCaptureException
} from '@sentry/browser';
import { getRelease } from '../../../sentry';
import Logger from './Logger';

let sentryInitialized = false;

export const initSentry = () => {
  const blacklist = ['GlobalHandlers', 'ReportingObserver', 'CaptureConsole'];
  if (process.env.SENTRY_ENABLE) {
    try {
      init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        release: getRelease(process.env.BUILD),
        integrations: integrations =>
          integrations.filter(i => !blacklist.includes(i.name))
      });
      sentryInitialized = true;
      Logger.info('Sentry initialized');
    } catch (error) {
      Logger.warn('Could not init Sentry in contentScript', error);
    }
  }
};

export { Scope };
type ScopeCallback = (scope: Scope) => void;
export const configureSentryScope = (scopeCallback: ScopeCallback) => {
  if (process.env.SENTRY_ENABLE && sentryInitialized) {
    configureScope(scopeCallback);
  }
};

export const captureMessage = (
  message: string,
  level?: Severity
): string | undefined => {
  if (process.env.SENTRY_ENABLE && sentryInitialized) {
    return sentryCaptureMessage(message, level);
  } else {
    switch (level) {
      case Severity.Fatal:
        Logger.fatal(message);
        break;
      case Severity.Error:
      case Severity.Critical:
        Logger.error(message);
        break;
      case Severity.Warning:
        Logger.warn(message);
        break;
      case Severity.Info:
        Logger.info(message);
        break;
      case Severity.Debug:
        Logger.debug(message);
        break;
      case Severity.Log:
      default:
        Logger.trace(message);
        break;
    }
  }
};

export const captureException = (exception: unknown): string | undefined => {
  if (process.env.SENTRY_ENABLE && sentryInitialized) {
    return sentryCaptureException(exception);
  } else {
    Logger.error(exception);
  }
};
