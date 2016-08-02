import {
  REDUCE_ALTERNATIVE_IFRAME, 
  EXTEND_ALTERNATIVE_IFRAME, 
  DEACTIVATE 
} from '../../constants/ActionTypes';

export default function (portCommunication){
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
    }
  };
}



