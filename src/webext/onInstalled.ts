export default new Promise<chrome.runtime.InstalledDetails>(resolve =>
  chrome.runtime.onInstalled.addListener(details => resolve(details))
);
