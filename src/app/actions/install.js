import { INSTALLED } from '../constants/ActionTypes';

function onInstalledPromise() {
  return new Promise(resolve => {

    chrome.runtime.onInstalled.addListener(details => {
      if (details.reason !== 'install') return;

      resolve(Object.assign({}, details, {
        datetime: new Date(),
        version: chrome.runtime.getManifest().version,
      }));
    });
  });
}

export function onInstalled() {
  return dispatch => {
    onInstalledPromise().then(onInstalledDetails => dispatch({
      type: INSTALLED,
      onInstalledDetails
    }));
  };
}
