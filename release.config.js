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
      cmd: 'yarn run release:production'
    },
    {
      path: '@semantic-release/exec',
      cmd: 'yarn run sign:firefox'
    },
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: 'build/bulles-*-an+fx.xpi',
          label: 'Firefox Package'
        },
        {
          path: 'build/bulles-v*-chromium.zip',
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
