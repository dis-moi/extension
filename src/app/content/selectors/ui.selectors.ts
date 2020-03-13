import * as R from 'ramda';
import { createSelector } from 'reselect';
import { UIState } from '../reducers/ui';

export interface StateWithUI {
  ui: UIState;
}

export const getUI = (state: StateWithUI): UIState => state.ui;

export const getTitle = createSelector([getUI], R.prop('title'));

const getNotification = createSelector([getUI], R.prop('notification'));
export const isOpen = createSelector([getNotification], R.prop('open'));
export const isMounted = createSelector([getNotification], R.prop('mounted'));
export const isLoaded = createSelector([getNotification], R.prop('loaded'));
