import { Action } from 'redux';

export const sendToTab = (
  tab: number,
  action: Action,
  options = {}
): Promise<Action> =>
  new Promise(resolve => {
    chrome.tabs.sendMessage(tab, action, options, response =>
      resolve(response)
    );
  });

export default sendToTab;
