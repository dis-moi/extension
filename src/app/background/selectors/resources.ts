import { createSelector } from 'reselect';
import { isTabAuthorizedByPatterns } from 'webext/isAuthorizedTab';
import { toPatterns } from '../../lmem/matchingContext';
import Tab from '../../lmem/tab';
import { findItemById } from 'app/utils/findItemById';
import { StateWithResources } from '../reducers';

export const getResources = (state: StateWithResources) => state.resources;

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
