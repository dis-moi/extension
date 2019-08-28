import { Store } from 'redux';
import { InstallationDetails } from '../lmem/installation';
import { BaseAction } from '.';
import { version } from '../../../package.json';
import onInstalled from '../../webext/onInstalled';
import { getInstallationDate } from '../background/selectors/prefs';

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

export default (onboardingUrl?: string) => (store: Store) =>
  onInstalled.then(installedDetails => {
    const datetime = getInstallationDate(store.getState());

    // @todo why not use this function to get the current version ?
    // const version = chrome.runtime.getManifest().version;

    const installationDetails: InstallationDetails = {
      ...installedDetails,
      version,
      datetime: datetime || new Date(),
      updatedAt: new Date()
    };

    store.dispatch(installed(installationDetails));

    if (onboardingUrl) {
      chrome.tabs.create({ url: onboardingUrl });
    }
  });
