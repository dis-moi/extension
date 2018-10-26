import {
  REDUCE_RECOMMENDATION_IFRAME,
  EXTEND_RECOMMENDATION_IFRAME,
  DEACTIVATE,
  UNINSTALL,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
  CHECKOUT_RECO_RESOURCE_BUTTON,
  CHECKOUT_RECO_RESOURCE_LINK,
  CHECKOUT_RECO_ALTERNATIVE,
  CHECKOUT_RECO_EDITOR,
  POPUP_CLICK,
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    reduce() {
      const action = {
        type: REDUCE_RECOMMENDATION_IFRAME
      };

      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    extend() {
      const action = {
        type: EXTEND_RECOMMENDATION_IFRAME
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);
      
      return action;
    },

    deactivate(details) {
      const action = Object.assign(
        { type: DEACTIVATE },
        details
      );

      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    closePrefScreen(){
      const action = {
        type: CLOSE_PREFERENCE_PANEL
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },
    
    openPrefScreen(panel){
      const action = {
        type: OPEN_PREFERENCE_PANEL,
        panel
      };

      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    checkOutResourceButton(resource) {
      const action = {
        type: CHECKOUT_RECO_RESOURCE_BUTTON,
        resource,
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    checkOutResourceLink(resource) {
      const action = {
        type: CHECKOUT_RECO_RESOURCE_LINK,
        resource,
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    checkOutAlternative(alternative) {
      const action = {
        type: CHECKOUT_RECO_ALTERNATIVE,
        alternative,
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    checkOutEditor(editor) {
      const action = {
        type: CHECKOUT_RECO_EDITOR,
        editor,
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    uninstall() {
      const action = {
        type: UNINSTALL,
        datetime: new Date(),
      };
      
      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },

    popupClick(target) {
      const action = {
        type: POPUP_CLICK,
        target,
      };

      if (portCommunication) portCommunication.sendBackgroundReduxAction(action);

      return action;
    },
  };
}



