const base = require('../base');

module.exports = {
  ...base,
  permissions: [...base.permissions, '*://*/*']
};
