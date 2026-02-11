const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = () => {
  const baseManifest = base();
  return {
    ...baseManifest,
    name: `${baseManifest.name} - development`,
    permissions: [...baseManifest.permissions, '*://*/*'],
    content_security_policy: csp({
      directives: {
        'script-src': ["'self'", "'unsafe-eval'"],
        'object-src': ["'self'"]
      }
    }),
    browser_action: {
      ...baseManifest.browser_action,
      default_title: `${baseManifest.browser_action.default_title} - development`
    }
  };
};
