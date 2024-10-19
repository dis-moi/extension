const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...facetBase,
    host_permissions: ['*://*/*']
  };
};
