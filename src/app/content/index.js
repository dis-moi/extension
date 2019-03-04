/* eslint-disable global-require */
if (!window.__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  require('./store');
  window.__LMEM__CONTENT_SCRIPT_INJECTED__ = true;
}
