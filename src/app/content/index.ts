/* eslint-disable global-require */
if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  require('./store');
  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;
}
