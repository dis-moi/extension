const production = require('../production/firefox');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...production(facet),
    name: `${facetBase.name} - proding`,
    action: {
      ...facetBase.action,
      default_title: `${facetBase.action.default_title} - proding`
    }
  };
};
