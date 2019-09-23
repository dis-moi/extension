import { Action } from 'redux';
import { captureMessage } from '@sentry/browser';
import { browserActionClicked } from 'app/actions/browser';

type Emit = (action: Action) => void;

const createBrowserActionListener = (emit: Emit) => {
  const handleClick = (tab: chrome.tabs.Tab) => {
    if (tab.id && tab.url) {
      emit(browserActionClicked({ id: tab.id, url: tab.url }));
    } else {
      const message = `Tab has no id (${tab.id}) or URL (${tab.url}).`;
      if (process.env.SENTRY_ENABLE) {
        captureMessage(message);
      } else {
        throw new Error(message);
      }
    }
  };

  chrome.browserAction.onClicked.addListener(handleClick);

  // unsubscribe
  return () => {
    chrome.browserAction.onClicked.removeListener(handleClick);
  };
};

export default createBrowserActionListener;
