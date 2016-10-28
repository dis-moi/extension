import { RECOMMENDATION_FOUND } from '../../constants/ActionTypes';

export default function (portCommunication) {
  return (recommendations) => {
    const action = {
      type: RECOMMENDATION_FOUND,
      recommendations,
    };
    portCommunication.sendBackgroundReduxAction(action);
    return action;
  };
}
