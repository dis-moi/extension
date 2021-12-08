/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const loadEnv = require('../../../../loadEnv');
loadEnv();
require('app-module-path').addPath(path.resolve(__dirname, '../../../'));

import * as Sentry from '@sentry/node';
import { getRelease } from '../../../../sentry';
import { boot } from './app';

if (process.env.SENTRY_ENABLED === 'true') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: getRelease(process.env.PLATFORM, process.env.NODE_ENV)
  });
}

boot();
