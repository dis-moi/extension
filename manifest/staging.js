const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  name: 'Bulles - STAGING',
  options_page: 'options.html',
  content_security_policy: csp({
    directives: {
      'default-src': [
        'https://staging-notices.bulles.fr',
        'https://notices.bulles.fr'
      ],
      'connect-src': [
        'https://staging-notices.bulles.fr',
        'https://notices.bulles.fr',
        'https://sentry.io',
        'https://stats.lmem.net/matomo.php'
      ],
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"],
      'img-src': [
        "'self'",
        'https://staging-notices.bulles.fr',
        'https://notices.bulles.fr',
        'data:'
      ],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
