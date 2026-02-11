const proding = require('../proding/firefox');
const base = require('../base');

module.exports = () => {
  const baseManifest = base();
  return {
    ...proding(),
    name: `${baseManifest.name} - staging`,
    browser_action: {
      ...baseManifest.browser_action,
      default_title: `${baseManifest.browser_action.default_title} - staging`
    }
  };
};
