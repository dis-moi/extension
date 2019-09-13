import { BaseAction } from '.';
import { InstallationDetails } from '../lmem/installation';
import { ContributorId } from '../lmem/contributor';

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

export interface SetupAction extends BaseAction {
  type: 'SETUP';
  payload: {
    subscriptions: ContributorId[];
    showExamples: boolean;
    redirectURl?: string;
  };
}

export const setup = (
  subscriptions: [],
  showExamples: boolean,
  redirectURl?: string,
  sendToTab = true
): SetupAction => ({
  type: 'SETUP',
  payload: {
    subscriptions,
    showExamples,
    redirectURl
  },
  meta: {
    sendToTab
  }
});
