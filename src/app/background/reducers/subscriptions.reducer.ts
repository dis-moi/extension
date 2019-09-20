import * as R from 'ramda';
import { AppAction } from 'app/actions';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';

export type SubscriptionsState = number[];

export default function subscriptionsReducer(
  state: SubscriptionsState = [],
  action: AppAction
) {
  switch (action.type) {
    case SUBSCRIBE: {
      return R.append(
        typeof action.payload.contributor !== 'number'
          ? action.payload.contributor.id
          : action.payload.contributor,
        state
      );
    }
    case UNSUBSCRIBE: {
      return R.without([action.payload.contributor.id], state);
    }
    default:
      return state;
  }
}