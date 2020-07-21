import { Action } from 'redux';
import { browserActionClicked } from 'app/actions/browser';
import { captureMessage } from 'app/utils/sentry';
import { Severity } from '@sentry/types';
import Tab from 'app/lmem/tab';

type Emit = (action: Action) => void;

const createBrowserActionListener = (emit: Emit) => {
  const handleClick = (tab: browser.tabs.Tab) => {
    if (typeof tab.id !== 'undefined') {
      emit(browserActionClicked(tab as Tab));
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
