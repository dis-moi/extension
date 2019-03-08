import csp from 'content-security-policy-builder';
import base from './base';

export default Object.assign(
  {},
  base,
  {
    'content_security_policy': csp({
      'directives': {
        'default-src': [
          'https://reco2bulle.lmem.net',
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
