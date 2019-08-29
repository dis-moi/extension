type CreateProperties = chrome.tabs.CreateProperties;

export const getOptionsUrl = () => chrome.extension.getURL('options.html');

const optionsTabDescription: CreateProperties = {
  url: getOptionsUrl(),
  active: true
};

const openOptions = () =>
  new Promise(resolve => {
    chrome.tabs.create(optionsTabDescription, (tab: chrome.tabs.Tab) => {
      resolve(tab);
    });
  });

export default openOptions;
