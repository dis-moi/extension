/**
 * This file is not meant to be imported directly as a manifest file.
 * Instead it should be imported by other files which contains all the missing manifest fields
 * which values are environment-specific.
 * See other files in the directory
 */

const version = require('../package.json').version;
const icons = require('./icons');

module.exports = facet => {
  const facetName = facet === 'lmel' ? 'Le Même en Local' : 'Dismoi';

  return Object.freeze({
    name: facetName,
    description:
      facet === 'lmel'
        ? 'La façon la plus simple de trouver des alternatives locales, en un seul clic. Gratuit et sans publicité.'
        : 'Amis, media, experts vous informent directement sur les pages web visitées. ',
    version,
    manifest_version: 3,
    icons: icons[facet],
    background: {
      scripts: ['/js/browser-polyfill.js', 'js/background.bundle.js']
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
        '16': 'img/logo/' + facet + '/16x16.png',
        '48': 'img/logo/' + facet + '/48x48.png',
        '128': 'img/logo/' + facet + '/128x128.png'
      },
      default_title: facetName
    },
    permissions: ['activeTab', 'storage', 'contextMenus', 'alarms'],
    web_accessible_resources: [
      {
        "resources": [
          'img/*',
          'fonts/*'
        ],
        "matches": [
          "*://*/*"
        ]
      }
    ]
  });
};
