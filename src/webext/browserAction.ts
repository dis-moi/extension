export const disable = (tab: chrome.tabs.Tab) => {
  if (tab.id) {
    chrome.browserAction.disable(tab.id);
  }
};
