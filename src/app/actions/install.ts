import { BaseAction } from '.';
import { InstallationDetails } from '../lmem/installation';

export interface InstalledAction extends BaseAction {
  type: 'INSTALLED';
  payload: {
    installedDetails: chrome.runtime.InstalledDetails;
  };
}

export const installed = (
  installedDetails: chrome.runtime.InstalledDetails
): InstalledAction => ({
  type: 'INSTALLED',
  payload: {
    installedDetails
  }
});

export interface InstallationDetailsAction extends BaseAction {
  type: 'INSTALLATION_DETAILS';
  payload: {
    installationDetails: InstallationDetails;
  };
}

export const updateInstallationDetails = (
  installationDetails: InstallationDetails,
  sendToTab = true
): InstallationDetailsAction => ({
  type: 'INSTALLATION_DETAILS',
  payload: {
    installationDetails
  },
  meta: {
    sendToTab
  }
});
