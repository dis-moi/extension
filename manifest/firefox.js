const base = require('./base');

module.exports = {
  ...base,
  shortname: 'LMEM',
  permissions: ['storage', 'tabs', 'http://*/*', 'https://*/*']
};
