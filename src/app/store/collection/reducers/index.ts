import { combineReducers, Reducer } from 'redux';
import fetched, { FetchedState } from './fetched';
import fetching, { FetchingState } from './fetching';
import items, { Item, ItemsState } from './items';
import lastFetched, { LastFetchedState } from './lastFetched';
import offset, { OffsetState } from './offset';

export interface CollectionState<I extends Item> {
  fetched: FetchedState;
  fetching: FetchingState;
  items: ItemsState<I>;
  lastFetched: LastFetchedState;
  offset?: OffsetState;
}

interface Options {
  withOffset?: boolean;
  indexedOffset?: boolean;
}

export default <I extends Item>(
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  itemIdentifier = 'id',
  options: Options = {}
) => {
  const reducers: Record<string, Reducer> = {
    fetched: fetched(REQUEST, SUCCESS, FAILURE),
    fetching: fetching(REQUEST, SUCCESS, FAILURE),
    items: items<I>(SUCCESS, itemIdentifier),
    lastFetched: lastFetched(REQUEST, SUCCESS, FAILURE)
  };

  if (options.withOffset) {
    reducers.offset = offset(SUCCESS, options.indexedOffset);
  }

  return combineReducers(reducers);
};
