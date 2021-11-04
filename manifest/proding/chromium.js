const csp = require('content-security-policy-builder');
const production = require('../production/chromium');
const base = require('../base');

module.exports = facet => {
  const facetBase = base(facet);
  return {
    ...production(facet),
    name: `${facetBase.name} - proding`,
    content_security_policy: csp({
      directives: {
        'default-src': ['https://api.dismoi.io'],
        'connect-src': [
          'https://api.dismoi.io',
          'https://sentry.io',
          'https://stats.lmem.net',
          'https://app.posthog.com'
        ],
        'script-src': ["'self'", "'unsafe-eval'"],
        'object-src': ["'self'"],
        'img-src': ["'self'", 'https://api.dismoi.io', 'data:'],
        'font-src': ["'self'", 'data:'],
        'style-src': ["'unsafe-inline'"]
      }
    }),
    browser_action: {
      ...facetBase.browser_action,
      default_title: `${facetBase.browser_action.default_title} - proding`
    }
  };
};
