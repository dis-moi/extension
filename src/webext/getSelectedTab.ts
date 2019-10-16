import Tab from 'app/lmem/tab';

const getSelectedTab = (): Promise<Tab> =>
  new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([selectedTab]) =>
      resolve(selectedTab as Tab)
    );
  });

export default getSelectedTab;
