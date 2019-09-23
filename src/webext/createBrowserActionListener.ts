import { Action } from 'redux';
import { browserActionClicked } from 'app/actions/browser';
import { captureMessage } from 'app/utils/sentry';
import { Severity } from '@sentry/types';

type Emit = (action: Action) => void;

const createBrowserActionListener = (emit: Emit) => {
  const handleClick = (tab: chrome.tabs.Tab) => {
    if (tab.id && tab.url) {
      emit(browserActionClicked({ id: tab.id, url: tab.url }));
    } else {
      captureMessage(
        `Tab has no id (${tab.id}) or URL (${tab.url}).`,
        Severity.Log
      );
    }
  };

  chrome.browserAction.onClicked.addListener(handleClick);

  // unsubscribe
  return () => {
    chrome.browserAction.onClicked.removeListener(handleClick);
  };
};

export default createBrowserActionListener;
