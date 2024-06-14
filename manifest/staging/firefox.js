const proding = require('../proding/firefox');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...proding(facet),
    name: `${facetBase.name} - staging`,
    action: {
      ...facetBase.action,
      default_title: `${facetBase.action.default_title} - staging`
    }
  };
};
