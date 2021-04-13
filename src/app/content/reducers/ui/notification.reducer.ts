import * as R from 'ramda';
import { LOADED } from '../../actions/ui/open.actions';
import { CLOSED, OPENED, AppAction } from 'app/actions';

export interface NotificationState {
  mounted: boolean;
  open: boolean;
  loaded: boolean;
}

const initialState: NotificationState = {
  mounted: false,
  open: false,
  loaded: false
};

export default (state: NotificationState = initialState, action: AppAction) => {
  switch (action.type) {
    case OPENED:
      return R.pipe(R.assoc('mounted', true), R.assoc('open', true))(state);
    case LOADED:
      return R.assoc('loaded', state.open, state);
    case CLOSED:
      return R.pipe(R.assoc('open', false), R.assoc('loaded', false))(state);
    default:
      return state;
  }
};
