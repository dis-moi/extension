import { eventChannel } from 'redux-saga';
import { browserActionClicked } from '../actions/browser/action';

export default () => {
  return eventChannel((emit) => {
    const handleClick = (tab) => {
      console.log('CACCA');
      emit(browserActionClicked(tab, tab.id));
    }

    chrome.browserAction.onClicked.addListener(handleClick);

    // unsubscribe
    return () => {
      chrome.browserAction.onClicked.removeListener(handleClick);
    };
  });
};