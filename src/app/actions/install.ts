import { BaseAction } from '.';
import { InstallationDetails } from '../lmem/installation';
import { ContributorId } from '../lmem/contributor';

export const INSTALLED = 'INSTALLED';
export interface InstalledAction extends BaseAction {
  type: typeof INSTALLED;
  payload: {
    installedDetails: chrome.runtime.InstalledDetails;
  };
}

export const installed = (
  installedDetails: chrome.runtime.InstalledDetails
): InstalledAction => ({
  type: INSTALLED,
  payload: {
    installedDetails
  }
});

export const INSTALLATION_DETAILS = 'INSTALLATION_DETAILS';
export interface InstallationDetailsAction extends BaseAction {
  type: typeof INSTALLATION_DETAILS;
  payload: {
    installationDetails: InstallationDetails;
  };
}

export const updateInstallationDetails = (
  installationDetails: InstallationDetails,
  sendToTab = true
): InstallationDetailsAction => ({
  type: INSTALLATION_DETAILS,
  payload: {
    installationDetails
  },
  meta: {
    sendToTab
  }
});

export const SETUP = 'SETUP';
export interface SetupAction extends BaseAction {
  type: typeof SETUP;
  payload: {
    subscriptions: ContributorId[];
    showExamples: boolean;
    redirectURl?: string;
  };
}

// FIXME it seems that this action is never used ?? It's for external setup right ?
export const setup = (
  subscriptions: [],
  showExamples: boolean,
  redirectURl?: string,
  sendToTab = true
): SetupAction => ({
  type: SETUP,
  payload: {
    subscriptions,
    showExamples,
    redirectURl
  },
  meta: {
    sendToTab
  }
});
