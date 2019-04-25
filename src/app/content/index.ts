if (!(window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__) {
  require('typeface-lato');
  require('typeface-sedgwick-ave');
  const store = require('./store');
  const externalClickHandler = require('./externalClickHandler');
  const handleExternalClick = externalClickHandler(store);

  window.addEventListener('load', () => {
    document.addEventListener('click', handleExternalClick);
  });

  window.addEventListener('unload', () => {
    document.removeEventListener('click', handleExternalClick);
  });

  (window as CustomWindow).__LMEM__CONTENT_SCRIPT_INJECTED__ = true;
}
