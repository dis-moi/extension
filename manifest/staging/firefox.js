const proding = require('../proding/firefox');
const base = require('../base');

module.exports = {
  ...proding,
  name: `${base.name} - staging`,
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - staging`
  },
  background: {
    ...base.background,
    persistent: false
  },
};
