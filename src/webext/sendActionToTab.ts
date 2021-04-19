import { Action } from 'redux';
import { serialize } from './serializer';

const sendToTab = (tabId: number, action: Action, options = {}) =>
  browser.tabs.sendMessage(tabId, serialize(action), options);

export default sendToTab;
