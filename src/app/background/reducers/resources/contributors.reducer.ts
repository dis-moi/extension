import { UPDATE_CONTRIBUTORS, AppAction } from 'app/actions';
import { Contributor } from 'app/lmem/contributor';

export type Contributors = Contributor[];

export const initialState: Contributors = [];

export default (state: Contributors = initialState, action: AppAction) => {
  switch (action.type) {
    case UPDATE_CONTRIBUTORS:
      return action.payload;

    default:
      return state;
  }
};
