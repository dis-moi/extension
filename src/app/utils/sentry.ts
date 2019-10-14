import {
  init,
  configureScope,
  Scope,
  Severity,
  captureMessage as sentryCaptureMessage,
  captureException as sentryCaptureException
} from '@sentry/browser';
import { version } from '../../../package.json';
import Logger from './Logger';

export const initSentry = () => {
  const blacklist = ['GlobalHandlers', 'ReportingObserver', 'CaptureConsole'];
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
  if (process.env.SENTRY_ENABLE) {
    return sentryCaptureException(exception);
  } else {
    Logger.error(exception);
  }
};
