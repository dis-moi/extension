import { INSTALLED } from '../../constants/ActionTypes';

// Promise constructed when the module is first imported (very early)
// in order to not miss the "install" event.
const onInstalledPromise = new Promise(resolve => {
  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason !== 'install') return;

    resolve(Object.assign({}, details, {
      datetime: new Date(),
      version: chrome.runtime.getManifest().version,
    }));
  });
});

export default function ({ onboardingUrl }) {
  return dispatch => {
    if (onboardingUrl) {
      onInstalledPromise.then(() => chrome.tabs.create({ url: onboardingUrl }));
    }

    onInstalledPromise.then(onInstalledDetails => dispatch({
      type: INSTALLED,
      onInstalledDetails
    }));
  };
}