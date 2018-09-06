const release = Object.freeze({
  analyzeCommits: {
    preset: 'angular',
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'MAJOR RELEASE'],
    },
  },
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  prepare: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/exec',
      cmd: 'sed -i \'s/"version":\\s*"${lastRelease.version}"/"version": "${nextRelease.version}"/\' package.json && ' +
        'npm run build:production'
    },
    {
      path: '@semantic-release/git',
      assets: [
        'package.json',
        'yarn.lock',
        'CHANGELOG.md',
        'build/**/*',
        'manifest/base.js'
      ],
      message: 'chore: release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }
  ],
  publish: [
   {
      path: '@semantic-release/github',
      assets: [
        {
          path: 'build/lmem-v*-firefox.zip',
          label: 'Firefox Package'
        },
        {
          path: 'build/lmem-v*-chromium.zip',
          label: 'Chromium Package'
        }
      ]
    }
  ]
});

module.exports = release;
