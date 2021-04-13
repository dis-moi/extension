import { InstallationDetails } from 'app/lmem/installation';
import { ContributorId } from 'app/lmem/contributor';
import { Level } from 'app/utils/Logger';
import { InstalledDetails } from 'webext/types';
import { ActionMeta, BaseAction, ErrorAction } from '.';

export const INSTALLED = 'EXTENSION/INSTALLED';
export interface InstalledAction extends BaseAction {
  type: typeof INSTALLED;
  payload: {
    installedDetails: InstalledDetails;
  };
}

export const installed = (
  installedDetails: InstalledDetails
): InstalledAction => ({
  type: INSTALLED,
  payload: {
    installedDetails
  }
});

export const FETCH_INSTALLATION_DETAILS =
  'EXTENSION/FETCH_INSTALLATION_DETAILS';
export interface FetchInstallationDetailsAction extends BaseAction {
  type: typeof FETCH_INSTALLATION_DETAILS;
}
export const fetchInstallationDetails = (
  meta?: ActionMeta
): FetchInstallationDetailsAction => ({
  type: FETCH_INSTALLATION_DETAILS,
  meta
});

export const FETCH_INSTALLATION_DETAILS_FAILURE =
  'EXTENSION/FETCH_INSTALLATION_DETAILS_FAILURE';
export interface FetchInstallationDetailsFailureAction extends ErrorAction {
  type: typeof FETCH_INSTALLATION_DETAILS_FAILURE;
}
export const fetchInstallationDetailsFailure = (
  error: Error,
  meta?: ActionMeta
): FetchInstallationDetailsFailureAction => ({
  type: FETCH_INSTALLATION_DETAILS_FAILURE,
  payload: error,
  error: true,
  meta: {
    ...meta,
    severity: Level.ERROR
  }
});

export const INSTALLATION_DETAILS = 'EXTENSION/INSTALLATION_DETAILS';
export interface InstallationDetailsAction extends BaseAction {
  type: typeof INSTALLATION_DETAILS;
  payload: {
    installationDetails: InstallationDetails;
  };
}

export const updateInstallationDetails = (
  installationDetails: InstallationDetails,
  meta?: ActionMeta
): InstallationDetailsAction => ({
  type: INSTALLATION_DETAILS,
  payload: {
    installationDetails
  },
  meta
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
