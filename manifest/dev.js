const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  name: 'LMEM - DEV',
  content_security_policy: csp({
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"]
    }
  })
  /*externally_connectable: {
    matches: [...base.externally_connectable.matches, '*://localhost/*']
  }*/
};
