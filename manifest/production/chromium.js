const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = facet => ({
  ...base(facet),
  content_security_policy: csp({
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
  }),
  externally_connectable: {
    matches: ['https://*.dismoi.io/*', 'https://*.lememe.fr/*'],
    accepts_tls_channel_id: false
  }
});
