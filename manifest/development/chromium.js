const csp = require('content-security-policy-builder');
const base = require('../base');

module.exports = {
  ...base,
  key:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuw5vP+Lrux5C7/2xOAb13OLhdVjoUrybRyq7BoLuaRPBOc3YOSP1XNVdzTfwwPNxKpPHAERYs6avmgKomfOPmuaxUpgj2hBGiJM9DJ9pbM6kkfn/ATRu9G+uug46UN8A+HbJWHsJJi/pWrGA95MBfILHmJoNN3GExnQWJZTMx7hdpgWRZmhBexEqfyI3xEzPpRTI/miU57qNwsyHw5/9riMGTpkjOqXG+sJqfax7Z630XrvmvOLN2tyG3jKbUdFx1krj1yHQDDRnkigp11BYqU1s08i1d2dY5Mnva0gT+lPuX8n/IeuMbyqkAkZTaCoeEycAdr3LGMvi2Q0uetwdJQIDAQAB',
  name: `${base.name} - development`,
  content_security_policy: csp({
    directives: {
      'script-src': ["'self'", "'unsafe-eval'"],
      'object-src': ["'self'"]
    }
  }),
  browser_action: {
    ...base.browser_action,
    default_title: `${base.browser_action.default_title} - development`
  },
  externally_connectable: {
    matches: ['*://localhost/*'],
    accepts_tls_channel_id: false
  }
};
