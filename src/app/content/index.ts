if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  require('./store');
  const { configureSentryScope, initSentry } = require('../utils/sentry');
  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;

  initSentry();

  configureSentryScope((scope: any) => {
    scope.setTag('context', 'content');
  });
}
