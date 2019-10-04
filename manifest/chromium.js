const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  content_security_policy: csp({
    directives: {
      'default-src': ['https://notices.lmem.net'],
      'connect-src': ['https://notices.lmem.net', 'https://sentry.io/api/*'],
      'script-src': ["'self'"],
      'object-src': ["'self'"],
      'img-src': ["'self'", 'https://notices.lmem.net', 'data:'],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
