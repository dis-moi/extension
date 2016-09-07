import base from './base.js';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM - DEV',
    'content_security_policy': 'default-src \'self\' https://preprod-lmem-craft-backend.cleverapps.io https://lmem-craft-backend.cleverapps.io; script-src \'self\' http://localhost:3000 \'unsafe-eval\' https://heapanalytics.com https://cdn.heapanalytics.com; style-src * \'unsafe-inline\'; img-src \'self\' https://heapanalytics.com https://heapanalytics.com data:;'
  }
);
