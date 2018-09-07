import base from './base.js';
import csp from 'content-security-policy-builder';

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
