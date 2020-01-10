import Tab from '../app/lmem/tab';

export const disable = (tab: Tab) => {
  if (tab.id) {
    chrome.browserAction.disable(tab.id);
  }
};
