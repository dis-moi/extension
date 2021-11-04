const proding = require('../proding/firefox');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...proding(facet),
    name: `${facetBase.name} - staging`,
    browser_action: {
      ...facetBase.browser_action,
      default_title: `${facetBase.browser_action.default_title} - staging`
    }
  };
};
