/* eslint-disable global-require */
import { init, configureScope } from '@sentry/browser';
import { version } from '../../../package.json';

if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  require('./store');
  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;

  init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: `${version}-${process.env.BUILD}`,
  });

  configureScope((scope: any) => {
    scope.setTag('context', 'content');
  });
}
