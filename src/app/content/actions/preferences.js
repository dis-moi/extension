import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECT_CRITERIUM,
  UNSELECT_CRITERIUM,
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

    selectCriterium(slug) {
      const action = {
        type: SELECT_CRITERIUM,
        slug
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    unselectCriterium(slug) {
      const action = {
        type: UNSELECT_CRITERIUM,
        slug
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

    excludeEditor(id) {
      const action = {
        type: EXCLUDE_EDITOR,
        id
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    includeEditor(id) {
      const action = {
        type: INCLUDE_EDITOR,
        id
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    }
  };
}