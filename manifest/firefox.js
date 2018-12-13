import base from './base.js';

export default Object.assign(
  {},
  base,
  {
    'permissions': [
      'storage',
      'tabs',
      'http://*/*',
      'https://*/*'
    ],
  }
);
