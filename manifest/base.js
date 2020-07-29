/**
 * This file is not meant to be imported directly as a manifest file.
 * Instead it should be imported by other files which contains all the missing manifest fields
 * which values are environment-specific.
 * See other files in the directory
 */

const version = require('../package.json').version;
const icons = require('./icons');

module.exports = Object.freeze({
  name: 'Dismoi',
  description:
    'Amis, media, experts vous informent directement sur les pages web visitées. ',
  version,
  manifest_version: 2,
  icons,
  background: {
    page: 'background.html'
  },
  content_scripts: [
    {
      exclude_globs: [
        '*.pdf*',
        '*.Pdf*',
        '*.PDF*',
        '*.jpeg*',
        '*.jpg*',
        '*.png*',
        '*.gif*'
      ],
      matches: ['*://*/*'],
      exclude_matches: [
        '*://*.googleusercontent.com/viewer/secure/pdf/*',
        '*://*.cdn.mozilla.net/*',
        '*://*.accounts.firefox.com/*',
        '*://*.addons.mozilla.org/*',
        '*://*.input.mozilla.org/*',
        '*://*.install.mozilla.org/*',
        '*://*.support.mozilla.org/*',
        '*://*.services.mozilla.org/*',
        '*://*.testpilot.firefox.com/*'
      ],
      js: ['js/browser-polyfill.js', 'js/content.bundle.js'],
      run_at: 'document_end'
    }
  ],
  browser_action: {
    default_icon: {
      '16': 'img/logo/16x16.png',
      '48': 'img/logo/48x48.png',
      '128': 'img/logo/128x128.png'
    },
    default_title: 'Dismoi'
  },
  permissions: ['activeTab', 'storage', 'contextMenus'],
  web_accessible_resources: ['img/*', 'fonts/*'],
});
