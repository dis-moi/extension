import * as R from 'ramda';
import { ItemIdentifierKey, ItemIdentifierValue } from '../ItemIdentifier';
import { FilterIdentifier } from '../FilterIdentifier';
import { Item, ItemsAction } from './items';
import { Action } from 'redux';

type FilterInfo<I> = {
  fetched?: number;
  completed: boolean;
  itemsIds: ItemIdentifierValue[];
};

export type FiltersState<I extends Item> = Record<
  FilterIdentifier,
  FilterInfo<I>
>;

const getFetchedCount = R.path<number | undefined>([
  'meta',
  'collection',
  'fetchedCount'
]);
const getFilterId = R.path<FilterIdentifier>(['meta', 'collection', 'filter']);
const getHasCompleted = R.path<boolean>(['meta', 'collection', 'completed']);

const isSuccessAction = (successType: string) => <I extends Item>(
  action: Action
): action is ItemsAction<I> => action.type === successType;

export default <I extends Item>(
  successType: string,
  itemIdentifier: ItemIdentifierKey<I>
) => (state: FiltersState<I> = {}, action: Action): FiltersState<I> => {
  const filterId = getFilterId(action);
  const fetchedCount = getFetchedCount(action);
  if (isSuccessAction(successType)(action) && filterId) {
    const previousFetchCount = state[filterId]?.fetched;
    return {
      ...state,
      [filterId]: {
        itemsIds: R.uniq([
          ...(state[filterId]?.itemsIds || []),
          ...R.pluck(itemIdentifier, (action as ItemsAction<I>).payload)
        ]),
        fetched:
          fetchedCount &&
          (!previousFetchCount || fetchedCount >= previousFetchCount)
            ? fetchedCount
            : previousFetchCount,
        completed:
          state[filterId]?.completed || getHasCompleted(action) || false
      }
    };
  }

  return state;
};
