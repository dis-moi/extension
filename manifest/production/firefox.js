const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...facetBase,
    permissions: [...facetBase.permissions, '*://*/*']
  };
};
