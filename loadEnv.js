/* eslint-disable @typescript-eslint/no-var-requires */
const nodePath = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

function loadEnv({ path, encoding, debug }) {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const FACET = process.env.FACET || 'dismoi';

  const dotenvFiles = [
    `.env.${NODE_ENV}.${FACET}.local`,
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}.${FACET}`,
    `.env.${FACET}`,
    `.env.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && '.env.local',
    '.env'
  ].filter(Boolean);

  dotenvFiles.forEach(dotenvFile => {
    const envPath = nodePath.resolve(path, dotenvFile);
    if (envPath && fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, encoding, debug });
    }
  });
}

module.exports = loadEnv;
