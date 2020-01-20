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
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run release'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run sign:firefox:staging'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run upload:chrome:staging'
    },
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: getPackagePath('*', 'firefox', 'staging'),
          label: 'Firefox Package - staging'
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
          path: getPackagePath('*', 'chromium', 'production'),
          label: 'Chromium Package'
        }
      ]
    }
    //FIXME: semantic-release-chrome does not take globs on assets pathnames
    //{
    //  path: 'semantic-release-chrome',
    //  asset: 'build/bulles-v*-chromium.zip',
    //  extensionId: 'fpjlnlnbacohacebkadbbjebbipcknbg',
    //},
  ]
});

module.exports = release;
