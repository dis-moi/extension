import { createSelector } from 'reselect';
import { ResourcesState } from '../reducers/resources.reducer';
import { isTabAuthorizedByPatterns } from 'webext/isAuthorizedTab';
import { toPatterns } from '../../lmem/matchingContext';
import Tab from '../../lmem/tab';

export const findItemById = <Item extends { id: number }>(id: number) => (
  items: Item[]
): Item | undefined => items.find(item => id === item.id);

export const getResources = (state: { resources: ResourcesState }) =>
  state.resources;

export const getRestrictedContexts = createSelector(
  [getResources],
  resources => resources.restrictedContexts
);

export const getRestrictedContextsPatterns = createSelector(
  [getRestrictedContexts],
  restrictedContexts => toPatterns(restrictedContexts)
);

export const isTabAuthorized = (tab: Tab | chrome.tabs.Tab) =>
  createSelector(
    [getRestrictedContextsPatterns],
    patterns => isTabAuthorizedByPatterns(patterns)(tab)
  );

export const getMatchingContexts = createSelector(
  [getResources],
  resources => resources.matchingContexts
);

export const getContributors = createSelector(
  [getResources],
  resources => resources.contributors
);

export const getContributorById = (id: number) =>
  createSelector(
    [getContributors],
    findItemById(id)
  );
