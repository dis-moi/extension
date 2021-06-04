import { combineReducers } from 'redux';
import {
  ReceivedContributorsAction,
  REFRESH_CONTRIBUTORS,
  REFRESH_CONTRIBUTORS_FAILED,
  SUBSCRIBE,
  SUBSCRIBED,
  SubscriptionAction,
  UNSUBSCRIBE,
  UNSUBSCRIBED,
  UPDATE_CONTRIBUTORS
} from 'libs/store/actions';
import {
  createLoadableContributor,
  StatefulContributor
} from 'libs/domain/contributor';
import { initialState, ItemsState } from 'libs/store/collection/reducers/items';
import { CollectionState } from 'libs/store/collection/reducers';
import fetched from 'libs/store/collection/reducers/fetched';
import fetching from 'libs/store/collection/reducers/fetching';
import lastFetched from 'libs/store/collection/reducers/lastFetched';
import {
  FETCH_CONTRIBUTOR_REQUEST,
  FETCH_CONTRIBUTOR_SUCCESS,
  FetchContributorAction
} from 'libs/store/actions/contributor';

export type ContributorsCollectionState = CollectionState<StatefulContributor>;

export const items = (
  state: ItemsState<StatefulContributor> = initialState,
  action:
    | FetchContributorAction
    | SubscriptionAction
    | ReceivedContributorsAction
): ItemsState<StatefulContributor> => {
  switch (action.type) {
    case UNSUBSCRIBE:
    case SUBSCRIBE: {
      const index = state.findIndex(item => item.id === action.payload);
      if (index) {
        return [
          ...state.slice(0, index),
          { ...state[index], subscribing: true },
          ...state.slice(index + 1)
        ];
      }

      return state;
    }

    case UNSUBSCRIBED: {
      const index = state.findIndex(item => item.id === action.payload);
      if (index) {
        return [
          ...state.slice(0, index),
          { ...state[index], subscribed: false, subscribing: false },
          ...state.slice(index + 1)
        ];
      }

      return state;
    }

    case SUBSCRIBED: {
      const index = state.findIndex(item => item.id === action.payload);
      if (index) {
        return [
          ...state.slice(0, index),
          { ...state[index], subscribed: true, subscribing: false },
          ...state.slice(index + 1)
        ];
      }

      return state;
    }

    case FETCH_CONTRIBUTOR_REQUEST: {
      return state
        .filter(item => item.id !== action.payload)
        .concat(createLoadableContributor({ id: action.payload }));
    }

    case FETCH_CONTRIBUTOR_SUCCESS: {
      return state
        .filter(item => item.id !== action.payload.id)
        .concat({ ...action.payload, loading: false });
    }

    case UPDATE_CONTRIBUTORS:
      return action.payload.map(contributor => ({
        ...contributor,
        loading: false
      }));

    default:
      return state;
  }
};

export default combineReducers({
  fetched: fetched(
    REFRESH_CONTRIBUTORS,
    UPDATE_CONTRIBUTORS,
    REFRESH_CONTRIBUTORS_FAILED
  ),
  fetching: fetching(
    REFRESH_CONTRIBUTORS,
    UPDATE_CONTRIBUTORS,
    REFRESH_CONTRIBUTORS_FAILED
  ),
  items,
  lastFetched: lastFetched(
    REFRESH_CONTRIBUTORS,
    UPDATE_CONTRIBUTORS,
    REFRESH_CONTRIBUTORS_FAILED
  )
});
