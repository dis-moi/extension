import { Action } from 'redux';

const sendToTab = (tabId: number, action: Action, options = {}) =>
  browser.tabs.sendMessage(tabId, action, options);

export default sendToTab;
