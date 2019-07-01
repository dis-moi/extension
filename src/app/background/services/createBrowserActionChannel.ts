import { eventChannel } from 'redux-saga';
import { captureMessage } from '@sentry/browser';
import { browserActionClicked } from 'app/actions/browser';

export const createBrowserActionChannel = () => {
  return eventChannel(emit => {
    const handleClick = (tab: chrome.tabs.Tab) => {
      if (tab.id && tab.url) {
        emit(browserActionClicked({ id: tab.id, url: tab.url }));
      }

      const message = `Tab has no id (${tab.id}) or URL (${tab.url}).`;
      if (process.env.SENTRY_ENABLE) {
        captureMessage(message);
      } else {
        console.log(message);
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
