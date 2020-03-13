const csp = require('content-security-policy-builder');
const production = require('../production/chromium');
const base = require('../base');

module.exports = {
  ...production,
  name: `${base.name} - proding`,
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
  }),
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - proding`,
  },
};
