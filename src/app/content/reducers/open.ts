import { CLOSED, OPENED } from '../../constants/ActionTypes';
import { AppAction } from 'app/actions';

const initialState = {
  open: false,
  mounted: false
};

export interface OpenState {
  open: boolean;
  mounted: boolean;
}

export default (state: OpenState = initialState, action: AppAction) => {
  switch (action.type) {
    case CLOSED:
      return { ...state, open: false };

    case OPENED:
      return { ...state, open: true, mounted: true };

    default:
      return state;
  }
};
