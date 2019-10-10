/**
 * This file is not meant to be imported directly as a manifest file.
 * Instead it should be imported by other files which contains all the missing manifest fields
 * which values are environment-specific.
 * See other files in the directory
 */

const version = require('../package.json').version;
const icons = require('./icons');

module.exports = Object.freeze({
  name: 'Bulles',
  description:
    'Amis, media, experts vous informent directement sur les pages web visitées. ' +
    'Vous aussi, postez librement des messages sur n’importe quelle page du web. ',
  version,
  manifest_version: 2,
  icons,
  background: {
    page: 'background.html'
  },
  options_page: 'options.html',
  browser_action: {
    default_icon: {
      '16': 'img/logo/16x16.png',
      '48': 'img/logo/48x48.png',
      '128': 'img/logo/128x128.png'
    },
    default_title: 'Bulles'
  },
  permissions: [
    'geolocation',
    'storage',
    'tabs',
    'unlimitedStorage',
    'http://*/*',
    'https://*/*'
  ]
  /* web_accessible_resources: ['img/*', 'fonts/*'],
  externally_connectable: {
    matches: ['https://*.lmem.net/*']
  } */
});
