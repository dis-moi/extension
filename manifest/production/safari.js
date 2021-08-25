const base = require('../base');
const csp = require('../csp');

module.exports = {
  ...base,
  background: {
    ...base.background,
    persistent: false
  },
  content_security_policy: csp
};
