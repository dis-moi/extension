import * as R from 'ramda';
import { AppAction, TOS_ACCEPTED, TRANSMIT_TOS_STATUS } from 'app/actions';

export interface TosState {
  tosAccepted?: boolean;
}

export default (state: TosState = {}, action: AppAction): TosState => {
  switch (action.type) {
    case TOS_ACCEPTED:
      return R.assoc('tosAccepted', true, state);
    case TRANSMIT_TOS_STATUS:
      return R.assoc('tosAccepted', action.payload, state);
    default:
      return state;
  }
};
