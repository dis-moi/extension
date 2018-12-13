import base from './base.js';
import csp from 'content-security-policy-builder';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM - DEV',
    'content_security_policy': csp({
      'directives': {
        'script-src': [
          '\'self\'',
          '\'unsafe-eval\'',
        ],
        'object-src': [
          '\'self\'',
        ]
      }
    })
  }
);
