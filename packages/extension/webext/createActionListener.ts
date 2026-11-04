import { Action } from 'redux';
import { Severity } from '@sentry/types';
import { browserActionClicked } from 'libs/store/actions/browser';
import { captureMessage } from 'libs/utils/sentry';

type Emit = (action: Action) => void;

const createActionListener = (emit: Emit) => {
  const handleClick = (tab: browser.tabs.Tab) => {
    if (tab.id && tab.url) {
      emit(browserActionClicked({ id: tab.id, url: tab.url }));
    } else {
      captureMessage(
        `Tab has no id (${tab.id}) or URL (${tab.url}).`,
        Severity.Log,
      );
    }
  };

  browser.action.onClicked.addListener(handleClick);

  // unsubscribe
  return () => {
    browser.action.onClicked.removeListener(handleClick);
  };
};

export default createActionListener;
