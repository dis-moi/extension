import { Map as ImmutableMap } from 'immutable';
import { INSTALLED_DETAILS } from '../../constants/ActionTypes';

export default (state = new ImmutableMap(), action) => {
  const { type, payload } = action;

  switch (type) {
    case INSTALLED_DETAILS:
      const { onInstalledDetails } = payload;
      return new ImmutableMap(onInstalledDetails);

    default:
      return state;
  }
};