import { createSelector } from 'reselect';
import { InstallationDetails } from 'libs/domain/installation';

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
