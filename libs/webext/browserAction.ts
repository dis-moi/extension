import Tab from '../lmem/tab';

export const disable = (tab: Tab) => {
  if (tab.id) {
    browser.browserAction.disable(tab.id);
  }
};
