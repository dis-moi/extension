import InstalledDetails = chrome.runtime.InstalledDetails;

export default new Promise<InstalledDetails>(resolve =>
  chrome.runtime.onInstalled.addListener(details => resolve(details))
);
