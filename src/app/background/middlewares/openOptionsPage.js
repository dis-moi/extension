import { OPEN_PREFERENCE_PANEL } from '../../constants/ActionTypes';

export default function (store){
  return next => action => {

    if (action.type === OPEN_PREFERENCE_PANEL) {
      if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
      } else {
        // Reasonable fallback.
        chrome.tabs.create({url: 'options.html'});
      }
    }

    return next(action);
  };
}