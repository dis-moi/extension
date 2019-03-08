export default (tab, action, options = {}) => new Promise((resolve) => {
  chrome.tabs.sendMessage(tab, action, options, response => resolve(response));
});