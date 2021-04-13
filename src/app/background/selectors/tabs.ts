import { createSelector } from 'reselect';
import * as R from 'ramda';
import { isOptionsTab, isTabReady } from 'app/lmem/tab';
import { TabsState } from '../reducers/tabs.reducer';

export const getTabs = (state: { tabs: TabsState }): TabsState => state.tabs;

export const getTabsList = createSelector([getTabs], Object.values);

export const getReadyTabs = createSelector([getTabsList], R.filter(isTabReady));

export const getOptionsTabs = createSelector(
  [getTabsList],
  R.filter(isOptionsTab)
);

export const getOptionsTab = createSelector([getOptionsTabs], optionsTabs =>
  optionsTabs.length > 0 ? optionsTabs[0] : null
);

export const getTabById = (tabId: number) =>
  createSelector([getTabs], tabs => tabs[tabId]);

export const getNoticesIdsOnTab = (tabId: number) =>
  createSelector(getTabById(tabId), tab => tab.notices);

export const getNumberOfNoticesOnTab = (tabId: number) =>
  createSelector(getNoticesIdsOnTab(tabId), noticesIds =>
    noticesIds ? noticesIds.length : 0
  );
