import { combineReducers } from 'redux';
import * as R from 'ramda';
import { Subscription } from 'libs/lmem/subscription';
import {
  SUBSCRIBED,
  SubscribedAction,
  UNSUBSCRIBED,
  UnsubscribedAction
} from 'src/app/actions';
import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FetchSubscriptionsSuccessAction
} from 'libs/store/actions/subscriptions';
import { initialState, ItemsState } from 'libs/store/collection/reducers/items';
import { CollectionState } from 'src/app/store/collection/reducers';
import fetched from 'libs/store/collection/reducers/fetched';
import fetching from 'libs/store/collection/reducers/fetching';
import lastFetched from 'libs/store/collection/reducers/lastFetched';

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
