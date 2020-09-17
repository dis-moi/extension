import { Item } from './reducers/items';
import { CollectionState } from './reducers';
import { trilean } from 'types';

export const isCollectionLoading = <I extends Item>({
  fetched,
  fetching
}: CollectionState<I>): trilean => {
  if (fetched) {
    return false;
  } else {
    if (fetching === 0) {
      return undefined;
    }

    return true;
  }
};

export const getFetchedCountForFilter = <I extends Item>(
  { filters }: CollectionState<I>,
  filterId: string | number
): number => (filters ? filters[filterId]?.fetched || 0 : 0);

export const getFetchedAllForFilter = <I extends Item>(
  { filters }: CollectionState<I>,
  filterId: string | number
): boolean => (filters ? filters[filterId]?.completed || false : false);
