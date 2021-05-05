import { createSelector } from 'reselect';
import { isTabAuthorizedByPatterns } from 'libs/webext/isAuthorizedTab';
import { toPatterns } from '../../../../../../libs/lmem/matchingContext';
import Tab from '../../../../../../libs/lmem/tab';
import { findItemById } from 'libs/utils/findItemById';
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

export const isTabAuthorized = (tab: Tab | browser.tabs.Tab) =>
  createSelector([getRestrictedContextsPatterns], patterns =>
    isTabAuthorizedByPatterns(patterns)(tab)
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
  createSelector([getContributors], findItemById(id));
