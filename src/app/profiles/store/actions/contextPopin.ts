import { ContextPopinState } from '../reducers/contextPopin.reducer';
import { StandardAction } from '../../../store/types';

export const SET_POPIN = 'SET_POPIN';

export const setContextPopin = (
  payload: ContextPopinState
): StandardAction => ({
  type: SET_POPIN,
  payload
});
export type PopinActionReturn = ReturnType<typeof setContextPopin>;
export type SetContextPopin = (payload: ContextPopinState) => PopinActionReturn;
