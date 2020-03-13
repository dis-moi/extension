const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = {
  ...base,
  name: `${base.name} - development`,
  permissions: [...base.permissions, '*://*/*'],
  content_security_policy: csp({
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"]
    }
  }),
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - development`,
  },
};
