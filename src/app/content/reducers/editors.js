import { Map as ImmutableMap } from 'immutable';
import { EDITORS, EXCLUDE_EDITOR, INCLUDE_EDITOR } from '../../constants/ActionTypes';

export default (state = new ImmutableMap(), action) => {
  const { type, payload } = action;

  switch (type) {
    case EDITORS: {
      const { editors } = payload;
      return new ImmutableMap(editors);
    }

    case EXCLUDE_EDITOR: {
      const { id } = payload;

      return state.setIn([id.toString(), 'isExcluded'], true);
    }

    case INCLUDE_EDITOR: {
      const { id } = payload;

      return state.setIn([id.toString(), 'isExcluded'], false);
    }

    default:
      return state;
  }
};
