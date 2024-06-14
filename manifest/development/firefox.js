const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...facetBase,
    name: `${facetBase.name} - development`,
    host_permissions: ['*://*/*'],
    content_security_policy: csp({
      directives: {
        'script-src': ["'self'", "'unsafe-eval'"],
        'object-src': ["'self'"]
      }
    }),
    action: {
      ...facetBase.action,
      default_title: `${facetBase.action.default_title} - development`
    }
  };
};
