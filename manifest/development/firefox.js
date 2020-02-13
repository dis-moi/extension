const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = {
  ...base,
  name: 'Bulles - development',
  permissions: [...base.permissions, '*://*/*'],
  content_security_policy: csp({
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"]
    }
  })
};
