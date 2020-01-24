const csp = require('content-security-policy-builder');
const proding = require('../proding/chromium');

module.exports = {
  ...proding,
  name: 'Bulles - staging',
  content_security_policy: csp({
    directives: {
      'default-src': ['https://staging-notices.bulles.fr'],
      'connect-src': [
        'https://staging-notices.bulles.fr',
        'https://sentry.io',
        'https://stats.lmem.net'
      ],
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"],
      'img-src': ["'self'", 'https://staging-notices.bulles.fr', 'data:'],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
