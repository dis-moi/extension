import { Action } from 'redux';

export const sendToTab = (
  tabId: number,
  action: Action,
  options = {}
): Promise<Action> =>
  new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, action, options, response =>
      resolve(response)
    );
  });

export default sendToTab;
