const nodePath = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

function loadEnv({ path, encoding, debug }) {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && '.env.local',
    '.env'
  ].filter(Boolean);

  dotenvFiles.map(dotenvFile => {
    const envPath = nodePath.resolve(path, dotenvFile);
    if (envPath && fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, encoding, debug });
    }
  });
}

module.exports = loadEnv;
