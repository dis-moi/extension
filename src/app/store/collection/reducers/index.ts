import { combineReducers, ReducersMapObject } from 'redux';
import fetched, { FetchedState } from './fetched';
import fetching, { FetchingState } from './fetching';
import items, { Item, ItemsState } from './items';
import lastFetched, { LastFetchedState } from './lastFetched';
import pagination, { PaginationState } from './pagination';
import filters, { FiltersState } from './filters';
import { ItemIdentifierKey } from '../ItemIdentifier';

export interface CollectionState<I extends Item> {
  fetched: FetchedState;
  fetching: FetchingState;
  items: ItemsState<I>;
  lastFetched: LastFetchedState;
  pagination?: PaginationState;
  filters?: FiltersState<I>;
}

interface Options {
  withPagination?: boolean;
  withFilters?: boolean;
}

export default <I extends Item>(
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
  itemIdentifier: ItemIdentifierKey<I> = 'id' as ItemIdentifierKey<I>,
  options: Options = {}
) => {
  const reducers: ReducersMapObject<CollectionState<I>> = {
    fetched: fetched(REQUEST, SUCCESS, FAILURE),
    fetching: fetching(REQUEST, SUCCESS, FAILURE),
    items: items<I>(SUCCESS, itemIdentifier),
    lastFetched: lastFetched(REQUEST, SUCCESS, FAILURE)
  };

  if (options.withPagination) {
    reducers.pagination = pagination(SUCCESS);
  }
  if (options.withFilters) {
    reducers.filters = filters(SUCCESS, itemIdentifier);
  }

  return combineReducers(reducers);
};
