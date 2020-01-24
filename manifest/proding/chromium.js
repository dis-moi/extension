const csp = require('content-security-policy-builder');
const production = require('../production/chromium');

module.exports = {
  ...production,
  name: 'Bulles - proding',
  content_security_policy: csp({
    directives: {
      'default-src': ['https://notices.bulles.fr'],
      'connect-src': [
        'https://notices.bulles.fr',
        'https://sentry.io',
        'https://stats.lmem.net'
      ],
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"],
      'img-src': ["'self'", 'https://notices.bulles.fr', 'data:'],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
