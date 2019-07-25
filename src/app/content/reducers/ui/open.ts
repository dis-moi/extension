import { CLOSED, OPENED } from '../../../constants/ActionTypes';
import { AppAction } from 'app/actions';

const initialState = false;

export type OpenState = boolean;

export default (state: OpenState = initialState, action: AppAction) => {
  switch (action.type) {
    case CLOSED:
      return false;

    case OPENED:
      return true;

    default:
      return state;
  }
};
