if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  const { configureSentryScope, initSentry } = require('../utils/sentry');

  initSentry();
  configureSentryScope((scope: any) => {
    scope.setTag('context', 'content');
  });

  require('typeface-lato');
  require('typeface-sedgwick-ave');
  const store = require('./store').default;
  const externalClickHandler = require('./externalClickHandler').default;
  const handleExternalClick = externalClickHandler(store);

  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;

  window.addEventListener('load', () => {
    document.addEventListener('click', handleExternalClick);
  });

  window.addEventListener('unload', () => {
    document.removeEventListener('click', handleExternalClick);
  });
}
