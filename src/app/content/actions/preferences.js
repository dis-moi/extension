import { DEACTIVATED_WEBSITES, INSTALLED_DETAILS } from '../../constants/ActionTypes';

export function updateDeactivatedWebsites(deactivatedWebsites) {
  return {
    type: DEACTIVATED_WEBSITES,
    deactivatedWebsites
  };
}

export function updateInstalledDetails(onInstalledDetails) {
  return {
    type: INSTALLED_DETAILS,
    onInstalledDetails
  };
}
