import { eventChannel } from 'redux-saga';
import { browserActionClicked } from 'app/actions/browser';

export const createBrowserActionChannel = () => {
  return eventChannel(emit => {
    const handleClick = (tab: chrome.tabs.Tab) => {
      if (tab.id && tab.url) {
        emit(browserActionClicked({ id: tab.id, url: tab.url }));
      } else {
        console.error('Tab had no id or URL.');
      }
    };

    chrome.browserAction.onClicked.addListener(handleClick);

    // unsubscribe
    return () => {
      chrome.browserAction.onClicked.removeListener(handleClick);
    };
  });
};

export default createBrowserActionChannel;
