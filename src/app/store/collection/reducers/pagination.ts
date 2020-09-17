import * as R from 'ramda';
import { AppAction } from 'app/actions';
import { Item, ItemsAction } from './items';
import { FilterIdentifier } from '../FilterIdentifier';
import { Action } from 'redux';

export interface PaginationState {
  fetched: number;
  completed: boolean;
}

const getFetchedCount = R.path<number>(['meta', 'collection', 'fetchedCount']);
const getFilterId = R.path<FilterIdentifier>(['meta', 'collection', 'filter']);
const getHasCompleted = R.path<boolean>(['meta', 'collection', 'completed']);

const initialState = {
  fetched: 0,
  completed: false
};

const isSuccessAction = (successType: string) => <I extends Item>(
  action: Action
): action is ItemsAction<I> => action.type === successType;

export default (successType: string) => <I extends Item>(
  state: PaginationState = initialState,
  action: AppAction
): PaginationState => {
  if (isSuccessAction(successType)(action) && !getFilterId(action)) {
    return getFetchedCount(action)
      ? {
          fetched: getFetchedCount(action) || 0,
          completed: getHasCompleted(action) || false
        }
      : state;
  }

  return state;
};
