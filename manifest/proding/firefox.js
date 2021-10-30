const production = require('../production/firefox');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...production(facet),
    name: `${facetBase.name} - proding`,
    browser_action: {
      ...facetBase.browser_action,
      default_title: `${facetBase.browser_action.default_title} - proding`
    }
  };
};
