import base from './base.js';
import csp from "content-security-policy-builder";

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM',
    'content_security_policy': csp({
      'directives': {
        'default-src': [
          'https://lmem-craft-backend.cleverapps.io'
        ],
        'script-src': [
          'https://ui.lmem.net',
          'https://heapanalytics.com', 
          'https://cdn.heapanalytics.com'
        ],
        'img-src': [
          'self',
          'https://heapanalytics.com',
          'https://cdn.heapanalytics.com',
          'data:'
        ]
      }
    })
  }
);
