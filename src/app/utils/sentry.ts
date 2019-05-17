import { init, configureScope, Scope } from '@sentry/browser';
import { version } from '../../../package.json';

export const initSentry = () => {
  if (process.env.SENTRY_ENABLE) {
    init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      release: `${version}-${process.env.BUILD}`
    });
  }
};

type ScopeCallback = (scope: Scope) => void;
export const configureSentryScope = (scopeCallback: ScopeCallback) => {
  if (process.env.SENTRY_ENABLE) {
    configureScope(scopeCallback);
  }
};
