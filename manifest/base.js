/**
 * This file is not meant to be imported directly as a manifest file.
 * Instead it should be imported by other files which contains all the missing manifest fields
 * which values are environment-specific.
 * See other files in the directory
 */

const version = process.env.npm_package_version;

module.exports = Object.freeze({
  name: 'Le Même en Mieux',
  description:
    'Qualité, prix, éthique : s’il existe un meilleur choix, vous le saurez. '
    + 'Gratuit et sans pub, respecte votre vie privée.',
  version,
  manifest_version: 2,
  icons: {
    '16': 'img/logo/16x16.png',
    '48': 'img/logo/48x48.png',
    '128': 'img/logo/128x128.png'
  },
  background: {
    page: 'background.html'
  },
  browser_action: {
    default_icon: {
      '16': 'img/logo/16x16.png',
      '48': 'img/logo/48x48.png',
      '128': 'img/logo/128x128.png'
    },
    default_title: 'Le Même en Mieux'
  },
  permissions: [
    'geolocation',
    'storage',
    'tabs',
    'unlimitedStorage',
    'http://*/*',
    'https://*/*'
  ],
  web_accessible_resources: ['img/*', 'fonts/*']
});
