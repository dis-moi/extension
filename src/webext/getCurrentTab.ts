import Tab from 'app/lmem/tab';

const getCurrentTab = (): Promise<Tab> =>
  new Promise(resolve => {
    chrome.tabs.getCurrent((tab?: chrome.tabs.Tab) => {
      resolve(tab as Tab);
    });
  });

export default getCurrentTab;
