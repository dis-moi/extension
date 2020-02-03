const base = require('../base');

module.exports = {
  ...base,
  background: {
    ...base.background,
    persistent: false
  },
  permissions: [...base.permissions, '*://*/*']
};
