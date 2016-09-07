import base from './base.js';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM',
    'content_security_policy': 'default-src \'self\' https://lmem-craft-backend.cleverapps.io; script-src \'self\' https://ui.lmem.net \'unsafe-eval\' https://heapanalytics.com https://cdn.heapanalytics.com; style-src * \'unsafe-inline\'; img-src \'self\' http://heapanalytics.com https://heapanalytics.com data:;'
  }
);