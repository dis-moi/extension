const { getPackagePath } = require('./webpack/packageNaming');

const release = Object.freeze({
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github'
  ],
  analyzeCommits: {
    preset: 'angular',
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'MAJOR RELEASE']
    }
  },
  prepare: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/exec',
      cmd:
        'sed -i -r \'s/"version":\\s*"[^"]+"/"version": "${nextRelease.version}"/\' package.json'
    },
    {
      path: '@semantic-release/git',
      assets: ['package.json', 'yarn.lock', 'CHANGELOG.md'],
      message: 'chore: release ${nextRelease.version}\n\n${nextRelease.notes}'
    }
  ],
  publish: [
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run buildVersion'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run upload:firefox:staging'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run upload:firefox:proding'
    },
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: getPackagePath('*', 'firefox', 'staging'),
          label: 'Firefox Package - staging'
        },
        {
          path: getPackagePath('*', 'firefox', 'proding'),
          label: 'Firefox Package - proding'
        },
        {
          path: getPackagePath('*', 'firefox', 'production'),
          label: 'Firefox Package'
        },
        {
          path: getPackagePath('*', 'chromium', 'staging'),
          label: 'Chromium Package - staging'
        },
        {
          path: getPackagePath('*', 'chromium', 'proding'),
          label: 'Chromium Package - proding'
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
