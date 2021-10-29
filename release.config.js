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
      cmd:
        'NODE_ENV=staging FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=proding FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=production FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=staging FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:firefox &&' +
        'NODE_ENV=proding FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:firefox &&' +
        'NODE_ENV=production FACET=dismoi SENTRY_SEND_VERSION=true yarn run build:firefox &&' +
        'NODE_ENV=staging FACET=lmel SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=proding FACET=lmel SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=production FACET=lmel SENTRY_SEND_VERSION=true yarn run build:chromium &&' +
        'NODE_ENV=staging FACET=lmel SENTRY_SEND_VERSION=true yarn run build:firefox &&' +
        'NODE_ENV=proding FACET=lmel SENTRY_SEND_VERSION=true yarn run build:firefox &&' +
        'NODE_ENV=production FACET=lmel SENTRY_SEND_VERSION=true yarn run build:firefox'
    },
    {
      path: '@semantic-release/exec',
      cmd:
        'NODE_ENV=staging FACET=dismoi yarn run upload:firefox && NODE_ENV=staging FACET=lmel yarn run upload:firefox'
    },
    {
      path: '@semantic-release/exec',
      cmd:
        'NODE_ENV=proding FACET=dismoi yarn run upload:firefox && NODE_ENV=proding FACET=lmel yarn run upload:firefox'
    },
    {
      path: '@semantic-release/github',
      assets: [
        {
          path: getPackagePath('*', 'firefox', 'staging', 'dismoi'),
          label: 'Firefox Package - staging'
        },
        {
          path: getPackagePath('*', 'firefox', 'proding', 'dismoi'),
          label: 'Firefox Package - proding'
        },
        {
          path: getPackagePath('*', 'firefox', 'production', 'dismoi'),
          label: 'Firefox Package'
        },
        {
          path: getPackagePath('*', 'chromium', 'staging', 'dismoi'),
          label: 'Chromium Package - staging'
        },
        {
          path: getPackagePath('*', 'chromium', 'proding', 'dismoi'),
          label: 'Chromium Package - proding'
        },
        {
          path: getPackagePath('*', 'chromium', 'production', 'dismoi'),
          label: 'Chromium Package'
        },
        {
          path: getPackagePath('*', 'firefox', 'staging', 'lmel'),
          label: 'Le Même en Local - Firefox Package - staging'
        },
        {
          path: getPackagePath('*', 'firefox', 'proding', 'lmel'),
          label: 'Le Même en Local - Firefox Package - proding'
        },
        {
          path: getPackagePath('*', 'firefox', 'production', 'lmel'),
          label: 'Le Même en Local - Firefox Package'
        },
        {
          path: getPackagePath('*', 'chromium', 'staging', 'lmel'),
          label: 'Le Même en Local - Chromium Package - staging'
        },
        {
          path: getPackagePath('*', 'chromium', 'proding', 'lmel'),
          label: 'Le Même en Local - Chromium Package - proding'
        },
        {
          path: getPackagePath('*', 'chromium', 'production', 'lmel'),
          label: 'Le Même en Local - Chromium Package'
        }
      ]
    }
  ]
});

module.exports = release;
