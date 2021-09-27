const base = require('../base');
const csp = require('../csp');

module.exports = {
  ...base,
  content_security_policy: csp,
  externally_connectable: {
    matches: ['https://*.dismoi.io/*'],
    accepts_tls_channel_id: false
  }
};
