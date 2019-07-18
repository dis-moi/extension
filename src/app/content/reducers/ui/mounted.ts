import { OPENED } from '../../../constants/ActionTypes';
import { AppAction } from 'app/actions';

const initialState = false;

export type MountedState = boolean;

export default (state: MountedState = initialState, action: AppAction) => {
  switch (action.type) {
    case OPENED:
      return true;

    default:
      return state;
  }
};
