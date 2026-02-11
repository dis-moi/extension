const production = require('../production/firefox');
const base = require('../base');

module.exports = () => {
  const baseManifest = base();
  return {
    ...production(),
    name: `${baseManifest.name} - proding`,
    browser_action: {
      ...baseManifest.browser_action,
      default_title: `${baseManifest.browser_action.default_title} - proding`
    }
  };
};
