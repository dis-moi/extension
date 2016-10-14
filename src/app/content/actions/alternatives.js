import { RECOMMENDATION_FOUND } from '../../constants/ActionTypes';

export default function alternativeFound(recommendations) {
  return {
    type: RECOMMENDATION_FOUND,
    recommendations
  };
}
