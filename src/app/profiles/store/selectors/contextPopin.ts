import { ProfilesState } from '../reducers';
import { createSelector } from 'reselect';
import { ContextPopinState } from '../reducers/contextPopin.reducer';

export const getContextPopinState = (state: ProfilesState) =>
  state.contextPopin;
export const getContextPopinContent = createSelector(
  [getContextPopinState],
  (contextPopin: ContextPopinState) => contextPopin
);
