import { Dispatch } from 'redux';
import { InstallationDetails } from '../lmem/installation';
import { BaseAction } from '.';
import { version } from '../../../package.json';

export interface InstalledAction extends BaseAction {
  type: 'INSTALLED';
  payload: {
    details: InstallationDetails;
  };
}

export const installed = (
  installationDetails: InstallationDetails
): InstalledAction => ({
  type: 'INSTALLED',
  payload: { details: installationDetails }
});

// Promise constructed when the module is first imported (very early)
// in order to not miss the "install" event.
const onInstalledPromise = new Promise<InstallationDetails>(resolve => {
  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason !== 'install') return;

    resolve({
      ...details,
      datetime: new Date(),
      version
    });
  });
});

export default function(onboardingUrl: string) {
  return (dispatch: Dispatch) =>
    onInstalledPromise.then((installationDetails: InstallationDetails) =>
      onboardingUrl
        ? chrome.tabs.create({ url: onboardingUrl })
        : dispatch(installed(installationDetails))
    );
}
