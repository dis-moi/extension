const production = require('../production/firefox');
const base = require('../base');

module.exports = {
  ...production,
  name: `${base.name} - proding`,
  background: {
    ...base.background,
    persistent: false
  },
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - proding`
  }
};
