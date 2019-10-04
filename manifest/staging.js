const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  name: 'LMEM - STAGING',
  content_security_policy: csp({
    directives: {
      'default-src': [
        'https://staging-notices.lmem.net',
        'https://notices.lmem.net'
      ],
      'connect-src': [
        'https://staging-notices.lmem.net',
        'https://notices.lmem.net',
        'https://sentry.io/api/*'
      ],
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"],
      'img-src': [
        "'self'",
        'https://staging-notices.lmem.net',
        'https://notices.lmem.net',
        'data:'
      ],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
