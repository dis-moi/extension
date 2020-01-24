const base = require('../base');

module.exports = {
  ...base,
  permissions: ['storage', 'tabs', '*://*/*']
};
