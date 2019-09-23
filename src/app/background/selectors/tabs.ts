import { BackgroundState } from '../reducers';
import { TabsState } from '../reducers/tabs.reducer';
import { createSelector } from 'reselect';
import Tab from '../../lmem/Tab';

export const getTabs = (state: BackgroundState): TabsState => state.tabs;

export const isOptionsTab = (tab: Tab) => tab.options === true;

export const getOptionsTab = createSelector(
  [getTabs],
  tabs =>
    Object.keys(tabs)
      .map(tabId => tabs[tabId])
      .find(isOptionsTab)
);
