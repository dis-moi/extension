import { RECOMMENDATION_FOUND } from '../../constants/ActionTypes';

export default function(recommendations) {
  return {
    type: RECOMMENDATION_FOUND,
    recommendations
  };
}
