import {
  REDUCE_ALTERNATIVE_IFRAME,
  EXTEND_ALTERNATIVE_IFRAME,
  DEACTIVATE,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
  REACTIVATE_WEBSITE
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    reduce() {
      const action = {
        type: REDUCE_ALTERNATIVE_IFRAME
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    extend() {
      const action = {
        type: EXTEND_ALTERNATIVE_IFRAME
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    deactivate(details) {
      const action = Object.assign(
        { type: DEACTIVATE },
        details
      );

      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    closePrefScreen(){
      const action = {
        type: CLOSE_PREFERENCE_PANEL
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },
    
    openPrefScreen(panel){
      const action = {
        type: OPEN_PREFERENCE_PANEL,
        panel
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    reactivateWebsite(s){
      const action = {
        type: REACTIVATE_WEBSITE,
        website: s
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    }
  };
}



