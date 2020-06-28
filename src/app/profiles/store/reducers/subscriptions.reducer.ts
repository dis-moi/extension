import { combineReducers } from 'redux';
import * as R from 'ramda';
import { Subscription } from 'app/lmem/subscription';
import {
  SUBSCRIBED,
  SubscribedAction,
  UNSUBSCRIBED,
  UnsubscribedAction
} from 'app/actions';
import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FetchSubscriptionsSuccessAction
} from 'app/actions/subscriptions';
import { initialState, ItemsState } from 'app/store/collection/reducers/items';
import { CollectionState } from 'app/store/collection/reducers';
import fetched from 'app/store/collection/reducers/fetched';
import fetching from 'app/store/collection/reducers/fetching';
import lastFetched from 'app/store/collection/reducers/lastFetched';

export type SubscriptionsCollectionState = CollectionState<Subscription>;

export const items = (
  state: ItemsState<Subscription> = initialState,
  action:
    | FetchSubscriptionsSuccessAction
    | SubscribedAction
    | UnsubscribedAction
): ItemsState<Subscription> => {
  switch (action.type) {
    case SUBSCRIBED: {
      return R.append(action.payload, state);
    }
    case UNSUBSCRIBED: {
      return R.without([action.payload], state);
    }
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  fetched: fetched(
    FETCH_SUBSCRIPTIONS,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE
  ),
  fetching: fetching(
    FETCH_SUBSCRIPTIONS,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE
  ),
  items,
  lastFetched: lastFetched(
    FETCH_SUBSCRIPTIONS,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE
  )
});
