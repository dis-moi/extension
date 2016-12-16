import {
  RECOMMENDATION_FOUND,
  DISMISS_RECO,
  APPROVE_RECO,
  REPORT_RECO
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    recommendationFound(recommendations){
      const action = {
        type: RECOMMENDATION_FOUND,
        recommendations
      };
      return action;
    },
    dismissReco(id){
      const action = {
        type: DISMISS_RECO,
        id
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },
    approveReco(id){
      const action = {
        type: APPROVE_RECO,
        id
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    },
    reportReco(id){
      const action = {
        type: REPORT_RECO,
        id
      };
      portCommunication.sendBackgroundReduxAction(action);
      return action;
    }
  };
}
