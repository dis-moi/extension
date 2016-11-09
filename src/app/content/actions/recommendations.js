import { RECOMMENDATION_FOUND } from '../../constants/ActionTypes';

export default function (portCommunication) {
  return (recommendations, matchingContexts) => {
    const action = {
      type: RECOMMENDATION_FOUND,
      recommendations,
      matchingContexts,
    };
    portCommunication.sendBackgroundReduxAction(action);
    return action;
  };
}
