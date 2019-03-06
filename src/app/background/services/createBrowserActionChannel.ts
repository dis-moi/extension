import { eventChannel } from 'redux-saga';
import { browserActionClicked } from 'app/actions/browser/browserAction';

export const createBrowserActionChannel = () => {
  return eventChannel(emit => {
    const handleClick = (tab: chrome.tabs.Tab) => {
      if (tab.id) {
        emit(browserActionClicked(tab.id));
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
