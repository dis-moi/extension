import { eventChannel } from 'redux-saga';
import { captureMessage } from 'app/utils/sentry';
import { browserActionClicked } from 'app/actions/browser';

export const createBrowserActionChannel = () => {
  return eventChannel(emit => {
    const handleClick = (tab: chrome.tabs.Tab) => {
      if (tab.id && tab.url) {
        emit(browserActionClicked({ id: tab.id, url: tab.url }));
      }
      captureMessage(`Tab has no id (${tab.id}) or URL (${tab.url}).`);
    };

    chrome.browserAction.onClicked.addListener(handleClick);

    // unsubscribe
    return () => {
      chrome.browserAction.onClicked.removeListener(handleClick);
    };
  });
};

export default createBrowserActionChannel;
