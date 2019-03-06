import { InstallationDetails } from '../lmem/installation';
import { BaseAction } from './BaseAction';

export interface InstalledDetailsAction extends BaseAction {
  type: 'INSTALLED_DETAILS';
  payload: {
    installationDetails: InstallationDetails;
  };
}

export const updateInstalledDetails = (
  installationDetails: InstallationDetails
): InstalledDetailsAction => ({
  type: 'INSTALLED_DETAILS',
  payload: {
    installationDetails
  },
  meta: {
    sendToTab: true
  }
});
