import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  WHITE_CRITERIA,
  EDITORS,
  BLACK_EDITORS
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

    updateWhiteCriteria(whiteCriteria) {
      const action = {
        type: WHITE_CRITERIA,
        whiteCriteria
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

    updateBlackEditors(blackEditors) {
      const action = {
        type: BLACK_EDITORS,
        blackEditors
      };

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    }
  };
}