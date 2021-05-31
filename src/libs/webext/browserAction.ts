import Tab from 'libs/lmem/tab';

export const disable = (tab: Tab) => {
  if (tab.id) {
    browser.browserAction.disable(tab.id);
  }
};
