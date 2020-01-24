const { getPackagePath } = require('./webpack/packageNaming');

const release = Object.freeze({
  verifyConditions: ['@semantic-release/github'],
  publish: [
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run release:production"'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run sign:firefox:production'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run upload:chrome:production'
    },
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: getPackagePath('*', 'firefox', 'production'),
          label: 'Firefox Package'
        },
        {
          path: getPackagePath('*', 'chromium', 'production'),
          label: 'Chromium Package'
        }
      ]
    }
  ]
});

module.exports = release;
