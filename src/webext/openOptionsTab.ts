type CreateProperties = chrome.tabs.CreateProperties;

export const getOptionsUrl = (pathname?: string) =>
  chrome.extension.getURL(`options.html${pathname && `#${pathname}`}`);

const createOptionsTabsDescription = (pathname?: string): CreateProperties => ({
  url: getOptionsUrl(pathname),
  active: true
});

const openOptions = (pathname?: string) =>
  new Promise(resolve => {
    chrome.tabs.create(
      createOptionsTabsDescription(pathname),
      (tab: chrome.tabs.Tab) => {
        resolve(tab);
      }
    );
  });

export default openOptions;
