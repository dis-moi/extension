type CreateProperties = chrome.tabs.CreateProperties;

export const getSettingsUrl = () => chrome.extension.getURL('settings.html');

const settingsTabDescription: CreateProperties = {
  url: getSettingsUrl(),
  active: true
};

const openSettings = () =>
  new Promise(resolve => {
    chrome.tabs.create(settingsTabDescription, (tab: chrome.tabs.Tab) => {
      resolve(tab);
    });
  });

export default openSettings;
