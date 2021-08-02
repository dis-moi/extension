import * as R from 'ramda';
import { Contributor } from 'libs/domain/contributor';
import {
  SUBSCRIBE,
  UNSUBSCRIBE,
  AppAction,
  UPDATE_CONTRIBUTORS
} from 'libs/store/actions';

export type SubscriptionsState = Contributor['id'][];

export default function subscriptionsReducer(
  state: SubscriptionsState = [],
  action: AppAction
) {
  switch (action.type) {
    case SUBSCRIBE: {
      return R.append(action.payload, state);
    }
    case UNSUBSCRIBE: {
      return R.without([action.payload], state);
    }
    case UPDATE_CONTRIBUTORS:
      return R.intersection(
        R.map(contributor => contributor.id, action.payload),
        state
      );
    default:
      return state;
  }
}
