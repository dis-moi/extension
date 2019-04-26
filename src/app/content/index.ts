if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  const store = require('./store').default;
  const externalClickHandler = require('./externalClickHandler').default;
  const handleExternalClick = externalClickHandler(store);

  window.addEventListener('load', () => {
    document.addEventListener('click', handleExternalClick);
  });

  window.addEventListener('unload', () => {
    document.removeEventListener('click', handleExternalClick);
  });

  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;

  init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: `${version}-${process.env.BUILD}`
  });

  configureScope((scope: any) => {
    scope.setTag('context', 'content');
  });
}
