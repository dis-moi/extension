/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as R from 'ramda';
import { AppAction } from '../../../actions';
import { ItemIdentifierKey } from '../ItemIdentifier';
import { FilterIdentifier } from '../FilterIdentifier';

export interface Item {}

export interface CollectionMeta {
  fetchedCount?: number;
  filter?: FilterIdentifier;
  completed: boolean;
}

export interface ItemsAction<I extends Item> {
  type: string;
  payload: I[];
  meta: {
    collection: CollectionMeta;
  };
}

export interface ItemAction<I extends Item> {
  type: string;
  payload: I;
}

export type ItemsState<I extends Item> = I[];

export const initialState = [];

export default <I extends Item>(
  SUCCESS: string,
  itemIdentifier: ItemIdentifierKey<I>
) => (
  state: ItemsState<I> = initialState,
  action: AppAction
): ItemsState<I> => {
  switch (action.type) {
    case SUCCESS: {
      return R.uniqWith(
        // @ts-ignore
        R.eqProps(itemIdentifier),
        R.concat(state, (action as ItemsAction<I>).payload)
      );
    }
    default:
      return state;
  }
};
