const release = Object.freeze({
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
          path: 'build/firefox.v*.zip',
          label: 'Firefox Package'
        },
        {
          path: 'build/chromium.v*.zip',
          label: 'Chromium Package'
        }
      ]
    }
  ]
});

export default release;
