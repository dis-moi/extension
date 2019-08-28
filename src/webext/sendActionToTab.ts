import { Action } from 'redux';

const sendToTab = (tabId: number, action: Action, options = {}): void => {
  chrome.tabs.sendMessage(tabId, action, options);
};

export default sendToTab;
