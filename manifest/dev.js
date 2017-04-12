import base from './base.js';
import csp from 'content-security-policy-builder';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM - DEV',
    'content_security_policy': csp({
      'directives': {
        'default-src': [
          'https://preprod-lmem-craft-backend.cleverapps.io',
        ],
        'script-src': [
          '\'self\'',
          'http://localhost:3000',
        ],
        'style-src': [
          '\'unsafe-inline\''
        ]
      }
    })
  }
);
