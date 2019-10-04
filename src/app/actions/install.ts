import { BaseAction, TabAction } from '.';
import { InstallationDetails } from '../lmem/installation';
import { ContributorId } from '../lmem/contributor';
import Tab from '../lmem/tab';

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

export interface FetchInstallationDetailsAction extends BaseAction {
  type: 'FETCH_INSTALLATIONS_DETAILS';
}

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
  meta: {
    tab: Tab;
  };
}

export const setup = (
  subscriptions: [],
  showExamples: boolean,
  tab: Tab,
  redirectURl?: string
): SetupAction => ({
  type: 'SETUP',
  payload: {
    subscriptions,
    showExamples,
    redirectURl
  },
  meta: {
    tab
  }
});

export interface SetupCompletedAction extends TabAction {
  type: 'SETUP_COMPLETED';
  meta: {
    sendToTab: true;
    tab: Tab;
  };
}

export const setupCompleted = (tab: Tab): SetupCompletedAction => ({
  type: 'SETUP_COMPLETED',
  meta: {
    sendToTab: true,
    tab
  }
});
