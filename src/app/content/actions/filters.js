import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EDITORS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR
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

    selectCriterion(slug) {
      const action = {
        type: SELECT_CRITERION,
        slug
      };

      if (portCommunication)
        portCommunication.sendBackgroundReduxAction(action);
      
      return action;
    },

    unselectCriterion(slug) {
      const action = {
        type: UNSELECT_CRITERION,
        slug
      };

      if (portCommunication)
        portCommunication.sendBackgroundReduxAction(action);
      
      return action;
    },

    updateEditors(editors) {
      return {
        type: EDITORS,
        editors
      };
    },

    excludeEditor(id) {
      const action = {
        type: EXCLUDE_EDITOR,
        id
      };

      if (portCommunication)
        portCommunication.sendBackgroundReduxAction(action);
      
      return action;
    },

    includeEditor(id) {
      const action = {
        type: INCLUDE_EDITOR,
        id
      };

      if (portCommunication)
        portCommunication.sendBackgroundReduxAction(action);
      
      return action;
    }
  };
}