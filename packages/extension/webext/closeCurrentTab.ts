export default () =>
  browser.tabs.getCurrent().then((tab) => {
    if (tab?.id) {
      browser.tabs.remove(tab.id);
    }
  });
