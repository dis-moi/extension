const csp = require('content-security-policy-builder');

module.exports = csp({
  directives: {
    'default-src': ['https://api.dismoi.io'],
    'connect-src': [
      'https://api.dismoi.io',
      'https://sentry.io',
      'https://stats.lmem.net',
      'https://app.posthog.com'
    ],
    'script-src': ["'self'"],
    'object-src': ["'self'"],
    'img-src': ["'self'", 'https://api.dismoi.io', 'data:'],
    'font-src': ["'self'", 'data:'],
    'style-src': ["'unsafe-inline'"]
  }
});
