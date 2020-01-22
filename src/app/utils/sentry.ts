import {
  init,
  configureScope,
  captureMessage as sentryCaptureMessage,
  captureException as sentryCaptureException
} from '@sentry/browser';
import { Scope, Severity, Event, EventHint } from '@sentry/types';
import { getRelease } from '../../../sentry';
import Logger from './Logger';

let sentryInitialized = false;

const beforeSend = (event: Event, hint: EventHint) => {
  const error = hint.originalException;
  if (
    error &&
    typeof error === 'object' &&
    error.message &&
    error.message.match(/ResizeObserver loop limit exceeded/i)
  ) {
    return null;
  }
  return event;
};

export const initSentry = () => {
  const blacklist = ['GlobalHandlers', 'ReportingObserver', 'CaptureConsole'];
  if (process.env.SENTRY_ENABLED) {
    try {
      init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        release: getRelease(process.env.PLATFORM, process.env.NODE_ENV),
        integrations: integrations =>
          integrations.filter(i => !blacklist.includes(i.name)),
        beforeSend
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
  if (process.env.SENTRY_ENABLED && sentryInitialized) {
    configureScope(scopeCallback);
  }
};

export const captureMessage = (
  message: string,
  level?: Severity
): string | undefined => {
  if (process.env.SENTRY_ENABLED && sentryInitialized) {
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

export const captureException = (
  exception: Error,
  message = ''
): string | undefined => {
  if (process.env.SENTRY_ENABLED && sentryInitialized) {
    return sentryCaptureException(exception);
  } else {
    Logger.error(message || `CatchedError: ${message || exception.message}`);
  }
};
