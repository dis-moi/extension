import * as Sentry from '@sentry/node';
import { boot } from './app';
import { getRelease } from '../../../../sentry';
import loadEnv from '../../../../loadEnv';

loadEnv();

if (process.env.SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: getRelease(process.env.PLATFORM, process.env.NODE_ENV)
  });
}

boot({ development: true });
