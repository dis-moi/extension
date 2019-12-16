import { Action } from 'redux';
import { tabActivated } from 'app/actions';

type Emit = (action: Action) => void;

export default (emit: Emit) => {
  const handleTabActivated = ({ tabId }: chrome.tabs.TabActiveInfo) => {
    emit(tabActivated(tabId));
  };

  chrome.tabs.onActivated.addListener(handleTabActivated);

  // unsubscribe
  return () => {
    chrome.tabs.onActivated.removeListener(handleTabActivated);
  };
};
