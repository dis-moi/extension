/* eslint-disable @typescript-eslint/no-var-requires */
const nodePath = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const findEnvDir = dir => {
  if (fs.existsSync(nodePath.resolve(dir, '.env'))) {
    return dir;
  }

  try {
    return findEnvDir(nodePath.resolve(dir, '..'));
  } catch (e) {
    console.error('Could not find env dir', e.message);
    return null;
  }
};

function loadEnv({ encoding, debug } = {}) {
  process.env.FACET = process.env.FACET || 'dismoi';
  const FACET = process.env.FACET;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  const envDir = findEnvDir(__dirname);

  process.env.ROOT_DIR = envDir;

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
    const envPath = nodePath.resolve(envDir, dotenvFile);
    if (envPath && fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, encoding, debug });
    }
  });
}

module.exports = loadEnv;
