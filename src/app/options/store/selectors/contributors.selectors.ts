import {
  Contributor,
  contributorIsSubscribed,
  sortSuggestedContributors,
  StatefulContributor
} from 'app/lmem/contributor';
import { createSelector } from 'reselect';
import * as R from 'ramda';
import { ContributorsState } from '../reducers/contributors.reducer';

export const getContributors = (state: {
  contributors: ContributorsState;
}): StatefulContributor[] => state.contributors;

export const getSubscriptions = createSelector(
  [getContributors],
  R.filter(contributorIsSubscribed)
);

export const getNbSusbcriptions = createSelector(
  [getSubscriptions],
  subscriptions => subscriptions.length
);

export const getContributorsSuggestions = createSelector(
  [getContributors],
  sortSuggestedContributors
);

export const makeGetNContributorsSuggestions = (n: number) =>
  createSelector<
    { contributors: ContributorsState },
    Contributor[],
    Contributor[]
  >(
    [getContributorsSuggestions],
    R.take(n)
  );
