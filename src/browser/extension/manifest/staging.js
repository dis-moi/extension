import base from './base.js';

export default Object.assign(
  {},
  base,
  {
    'name': 'LMEM - STAGING',
    'permissions': [
      'contextMenus',
      'privacy',
      'storage',
      'tabs',
      'unlimitedStorage',
      'webNavigation',
      'webRequest',
      'webRequestBlocking',
      'http://*/*',
      'https://*/*'
    ],
    'content_security_policy': 'default-src \'self\' https://preprod-lmem-craft-backend.cleverapps.io; script-src \'self\' https://testing.ui.lmem.net \'unsafe-eval\' https://heapanalytics.com https://cdn.heapanalytics.com; style-src * \'unsafe-inline\'; img-src \'self\' http://heapanalytics.com https://heapanalytics.com data:;'
  }
);
