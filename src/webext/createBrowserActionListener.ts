import { Action } from 'redux';
import { Severity } from '@sentry/types';
import { browserActionClicked } from 'app/actions/browser';
import { captureMessage } from 'app/utils/sentry';

type Emit = (action: Action) => void;

const createBrowserActionListener = (emit: Emit) => {
  const handleClick = (tab: browser.tabs.Tab) => {
    if (tab.id && tab.url) {
      emit(browserActionClicked({ id: tab.id, url: tab.url }));
    } else {
      captureMessage(
        `Tab has no id (${tab.id}) or URL (${tab.url}).`,
        Severity.Log
      );
    }
  };

  browser.browserAction.onClicked.addListener(handleClick);

  // unsubscribe
  return () => {
    browser.browserAction.onClicked.removeListener(handleClick);
  };
};

export default createBrowserActionListener;
