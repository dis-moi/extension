import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  EDITORS,
} from '../../constants/ActionTypes';

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

export function updateCriteria(criteria) {
  return {
    type: CRITERIA,
    criteria
  };
}

export function updateEditors(editors) {
  return {
    type: EDITORS,
    editors,
  };
}
