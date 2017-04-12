import base from './base.js';
import csp from 'content-security-policy-builder';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM',
    'permissions': [
      'storage',
      'tabs',
      // 'unlimitedStorage',
      'http://*/*',
      'https://*/*'
    ],
    'content_security_policy': csp({
      'directives': {
        'default-src': [
          'https://recommendations.lmem.net',
        ],
        'style-src': [
          '\'unsafe-inline\''
        ]
      }
    })
  }
);
