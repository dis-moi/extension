import { createSelector } from 'reselect';
import { InstallationDetails } from 'app/lmem/installation';

export const getInstallationDetails = (state: {
  installationDetails: InstallationDetails;
}) => state.installationDetails;
export const getInstallationDate = createSelector(
  getInstallationDetails,
  (installationDetails: InstallationDetails) =>
    installationDetails.datetime
      ? new Date(installationDetails.datetime)
      : undefined
);
