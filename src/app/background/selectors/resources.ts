import { createSelector } from 'reselect';
import { isTabAuthorizedByPatterns } from 'libs/webext/isAuthorizedTab';
import { findItemById } from 'libs/utils/findItemById';
import { MatchingContext, toPatterns } from '../../lmem/matchingContext';
import Tab from '../../lmem/tab';
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
  resources => Object.values(resources.matchingContexts) as MatchingContext[]
);

export const getContributors = createSelector(
  [getResources],
  resources => resources.contributors
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
