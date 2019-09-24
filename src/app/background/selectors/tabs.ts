import { createSelector } from 'reselect';
import * as R from 'ramda';
import { isOptionsTab, isTabReady } from 'app/lmem/tab';
import { TabsState } from '../reducers/tabs.reducer';

export const getTabs = (state: { tabs: TabsState }): TabsState => state.tabs;

export const getTabsList = createSelector(
  [getTabs],
  Object.values
);

export const getReadyTabs = createSelector(
  [getTabsList],
  R.filter(isTabReady)
);

export const getOptionsTabs = createSelector(
  [getTabsList],
  R.filter(isOptionsTab)
);
