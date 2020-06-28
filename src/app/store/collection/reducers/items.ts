import * as R from 'ramda';

export type Item<Id extends string = 'id'> = Record<Id, unknown>;

export interface ItemsAction<I extends Item<Id>, Id extends string> {
  type: string;
  payload: I[];
}

export type ItemsState<I extends Item<Id>, Id extends string> = I[];

export const initialState = [];

export default <I extends Item<Id>, Id extends string>(
  SUCCESS: string,
  itemId: string
) => (
  state: ItemsState<I, Id> = initialState,
  action: ItemsAction<I, Id>
): ItemsState<I, Id> => {
  switch (action.type) {
    case SUCCESS: {
      return R.uniqWith(R.eqProps(itemId), R.concat(state, action.payload));
    }
    default:
      return state;
  }
};
