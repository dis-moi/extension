/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as R from 'ramda';

export interface Item {}

export interface ItemsAction<I extends Item> {
  type: string;
  payload: I[];
}

export interface ItemAction<I extends Item> {
  type: string;
  payload: I;
}

export type ItemsState<I extends Item> = I[];

export const initialState = [];

export default <I extends Item>(SUCCESS: string, itemIdentifier: string) => (
  state: ItemsState<I> = initialState,
  action: ItemsAction<I>
): ItemsState<I> => {
  switch (action.type) {
    case SUCCESS: {
      return R.uniqWith(
        // @ts-ignore
        R.eqProps(itemIdentifier),
        R.concat(state, action.payload)
      );
    }
    default:
      return state;
  }
};
