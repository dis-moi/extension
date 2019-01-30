import {
  EXTEND_RECOMMENDATION_IFRAME,
  RECOMMENDATION_FOUND,
  REDUCE_RECOMMENDATION_IFRAME
} from '../../constants/ActionTypes';

export default (state = true, action) => {
  const { type } = action;

  switch (type) {
    case REDUCE_RECOMMENDATION_IFRAME:
      return true;

    case RECOMMENDATION_FOUND:
    case EXTEND_RECOMMENDATION_IFRAME:
      return false;

    default:
      return state;
  }
};