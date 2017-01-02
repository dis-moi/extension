import {
  REDUCE_RECOMMENDATION_IFRAME,
  EXTEND_RECOMMENDATION_IFRAME,
  DEACTIVATE,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
  REACTIVATE_WEBSITE,
  CHECKOUT_RECO_RESOURCE,
  CHECKOUT_RECO_ALTERNATIVE,
  CHECKOUT_RECO_EDITOR,
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    reduce() {
      const action = {
        type: REDUCE_RECOMMENDATION_IFRAME
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    extend() {
      const action = {
        type: EXTEND_RECOMMENDATION_IFRAME
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

    checkOutResource(resource) {
      const action = {
        type: CHECKOUT_RECO_RESOURCE,
        resource,
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    checkOutAlternative(alternative) {
      const action = {
        type: CHECKOUT_RECO_ALTERNATIVE,
        alternative,
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

    checkOutEditor(editor) {
      const action = {
        type: CHECKOUT_RECO_EDITOR,
        editor,
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },

  };
}



