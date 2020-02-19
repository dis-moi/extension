const { getPackagePath } = require('./webpack/packageNaming');

const release = Object.freeze({
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
    'semantic-release-chrome'
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
      message:
        'chore: release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ],
  publish: [
    // staging
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run release:staging'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run sign:firefox:staging'
    },

    // proding
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run release:proding'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run sign:firefox:proding'
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
          path: getPackagePath('*', 'chromium', 'staging'),
          label: 'Chromium Package - staging'
        },
        {
          path: getPackagePath('*', 'chromium', 'proding'),
          label: 'Chromium Package - proding'
        },
      ]
    }
  ]
});

module.exports = release;
