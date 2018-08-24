import base from './base.js';
import csp from 'content-security-policy-builder';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM',
    'content_security_policy': csp({
      'directives': {
        'default-src': [
          'https://recommendations.lmem.net',
        ],
        'script-src': [
          '\'self\'',
          'https://heapanalytics.com',
          'https://cdn.heapanalytics.com'
        ],
        'object-src': [
          '\'self\''
        ],
        'img-src': [
          '\'self\'',
          'https://heapanalytics.com',
          'https://cdn.heapanalytics.com',
          'data:'
        ],
        'style-src': [
          '\'unsafe-inline\''
        ]
      }
    })
  }
);
