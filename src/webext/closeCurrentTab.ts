export default () =>
  browser.tabs.getCurrent().then(({ id }) => browser.tabs.remove(id || []));
