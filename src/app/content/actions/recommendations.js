import {
  RECOMMENDATION_FOUND,
  DISMISS_RECO,
  APPROVE_RECO,
  UNAPPROVE_RECO,
  REPORT_RECO,
} from '../../constants/ActionTypes';

export default function (portCommunication) {
  return {
    recommendationFound(recommendations){
      return {
        type: RECOMMENDATION_FOUND,
        recommendations
      };
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
    unapproveReco(id){
      const action = {
        type: UNAPPROVE_RECO,
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
