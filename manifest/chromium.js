const csp = require('content-security-policy-builder');
const base = require('./base');

module.exports = {
  ...base,
  options_page: 'options.html',
  content_security_policy: csp({
    directives: {
      'default-src': ['https://notices.bulles.fr'],
      'connect-src': ['https://notices.bulles.fr', 'https://sentry.io/api/*'],
      'script-src': ["'self'"],
      'object-src': ["'self'"],
      'img-src': ["'self'", 'https://notices.bulles.fr', 'data:'],
      'font-src': ["'self'", 'data:'],
      'style-src': ["'unsafe-inline'"]
    }
  })
};
