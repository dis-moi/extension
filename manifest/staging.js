const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  name: 'LMEM - STAGING',
  content_security_policy: csp({
    directives: {
      'default-src': ['https://staging-notices.lmem.net'],
      'script-src': [
        "'self'",
        "'unsafe-eval'",
        'https://heapanalytics.com',
        'https://cdn.heapanalytics.com'
      ],
      'object-src': ["'self'"],
      'img-src': [
        "'self'",
        'https://heapanalytics.com',
        'https://cdn.heapanalytics.com',
        'data:'
      ],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
