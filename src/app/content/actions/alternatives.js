import { ALTERNATIVE_FOUND } from '../../constants/ActionTypes';

export default function alternativeFound(recommendations) {
  return {
    type: ALTERNATIVE_FOUND,
    recommendations
  };
}
