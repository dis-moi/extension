import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECTED_CRITERIA,
  EDITORS,
  EXCLUDED_EDITORS
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    updateDeactivatedWebsites(deactivatedWebsites) {
      return {
        type: DEACTIVATED_WEBSITES,
        deactivatedWebsites
      };
    },
    
    updateInstalledDetails(onInstalledDetails) {
      return {
        type: INSTALLED_DETAILS,
        onInstalledDetails
      };
    },
    
    updateCriteria(criteria) {
      return {
        type: CRITERIA,
        criteria
      };
    },

    updateSelectedCriteria(selectedCriteria) {
      const action = {
        type: SELECTED_CRITERIA,
        selectedCriteria
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    updateEditors(editors) {
      return {
        type: EDITORS,
        editors
      };
    },

    updateExcludedEditors(excludedEditors) {
      const action = {
        type: EXCLUDED_EDITORS,
        excludedEditors
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    }
  };
}