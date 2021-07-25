const csp = require('content-security-policy-builder');
const proding = require('../proding/chromium');
const base = require('../base');

module.exports = {
  ...proding,
  name: `${base.name} - staging`,
  content_security_policy: csp({
    directives: {
      'default-src': ['https://staging.dismoi.io'],
      'connect-src': [
        'https://staging.dismoi.io',
        'https://sentry.io',
        'https://stats.lmem.net'
      ],
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"],
      'img-src': ["'self'", 'https://staging.dismoi.io', 'data:'],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  }),
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - staging`
  }
};
