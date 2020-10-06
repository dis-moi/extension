import { Item } from './reducers/items';
import { CollectionState, FetchedState, FetchingState } from './reducers';
import { trilean } from 'types';

export const isCollectionLoading = ({
  fetched,
  fetching
}: {
  fetched: FetchedState;
  fetching: FetchingState;
}): trilean => {
  if (fetched) {
    return false;
  } else {
    if (fetching === 0) {
      return undefined;
    }

    return true;
  }
};

export const getIndexedOffset = <I extends Item>(
  { offset }: CollectionState<I>,
  index: string | number
): number =>
  offset && offset._indexed && offset[index] ? offset[index].current || 0 : 0;

export const getIndexedFetchedAll = <I extends Item>(
  { offset }: CollectionState<I>,
  index: string | number
): boolean =>
  offset && offset._indexed && offset[index]
    ? offset[index].fetchedAll || false
    : false;
