import { StandardAction } from 'libs/store/types';
import { ContextPopinState } from '../reducers/contextPopin.reducer';

export const SET_POPIN = 'SET_POPIN';

export const setContextPopin = (
  payload: ContextPopinState
): StandardAction => ({
  type: SET_POPIN,
  payload
});
export type PopinActionReturn = ReturnType<typeof setContextPopin>;
export type SetContextPopin = (payload: ContextPopinState) => PopinActionReturn;
