import { createSelector } from 'reselect';
import { UIState } from '../reducers/ui';

export interface StateWithUI {
  ui: UIState;
}

export const getUI = (state: StateWithUI): UIState => state.ui;

export const isOpen = createSelector(
  [getUI],
  ui => ui.notification.open
);
export const isMounted = createSelector(
  [getUI],
  ui => ui.notification.mounted
);
export const isLoaded = createSelector(
  [getUI],
  ui => ui.notification.loaded
);
export const getTitle = createSelector(
  [getUI],
  ui => ui.title
);
