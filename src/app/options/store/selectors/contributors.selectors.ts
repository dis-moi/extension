import { createSelector } from 'reselect';
import * as R from 'ramda';
import {
  contributorIsSubscribed,
  sortContributorsByContributions,
  Contributor,
  StatefulContributor
} from 'app/lmem/contributor';
import { ContributorsState } from '../reducers/contributors.reducer';
import { findItemById } from 'app/utils/findItemById';

export interface StateWithContributors {
  contributors: ContributorsState;
}

export const getContributors = (
  state: StateWithContributors
): StatefulContributor[] => state.contributors;

export const getNbTotalContributors = createSelector<
  StateWithContributors,
  ContributorsState,
  number | undefined
>([getContributors], contributors => contributors.length);

export const getSortedContributors = createSelector(
  [getContributors],
  sortContributorsByContributions
);

export const getSubscriptions = createSelector(
  [getSortedContributors],
  R.filter(contributorIsSubscribed)
);

export const getNbSusbcriptions = createSelector(
  [getSubscriptions],
  subscriptions => subscriptions.length
);

export const getContributorsSuggestions = createSelector(
  [getSortedContributors],
  R.reject(contributorIsSubscribed)
);

export const makeGetNContributorsSuggestions = (n: number) =>
  createSelector<
    { contributors: ContributorsState },
    Contributor[],
    Contributor[]
  >([getContributorsSuggestions], R.take(n));

export const get5ContributorsSuggestions = makeGetNContributorsSuggestions(5);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
