import { combineReducers } from 'redux';

import fetched, { FetchedState } from './fetched';
import fetching, { FetchingState } from './fetching';
import items, { Item, ItemsState } from './items';
import lastFetched, { LastFetchedState } from './lastFetched';

export interface CollectionState<I extends Item> {
  fetched: FetchedState;
  fetching: FetchingState;
  items: ItemsState<I>;
  lastFetched: LastFetchedState;
}

export default <I extends Item>(
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  itemIdentifier = 'id'
) =>
  combineReducers({
    fetched: fetched(REQUEST, SUCCESS, FAILURE),
    fetching: fetching(REQUEST, SUCCESS, FAILURE),
    items: items<I>(SUCCESS, itemIdentifier),
    lastFetched: lastFetched(REQUEST, SUCCESS, FAILURE)
  });
