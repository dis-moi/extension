import { BackgroundState } from '../reducers';
import { createSelector } from 'reselect';
import { InstallationDetails } from '../../lmem/installation';

export const getInstallationDetails = (state: BackgroundState) =>
  state.installationDetails;
export const getInstallationDate = createSelector(
  getInstallationDetails,
  (installationDetails: InstallationDetails) =>
    installationDetails.datetime
      ? new Date(installationDetails.datetime)
      : undefined
);
