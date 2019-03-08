import {Map as ImmutableMap} from 'immutable';
import { CRITERIA, SELECT_CRITERION, UNSELECT_CRITERION } from '../../constants/ActionTypes';

export default (state = new ImmutableMap(), action) => {
  const { type, payload } = action;

  switch (type) {
    case CRITERIA: {
      const { criteria } = payload;
      return state.set('criteria', criteria);
    }

    case SELECT_CRITERION: {
      const { slug } = payload;
      return state.setIn([slug, 'isSelected'], true);
    }

    case UNSELECT_CRITERION: {
      const { slug } = payload;
      return state.setIn([slug, 'isSelected'], false);
    }

    default:
      return state;
  }
};
