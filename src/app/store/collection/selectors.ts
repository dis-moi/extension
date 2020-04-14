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
