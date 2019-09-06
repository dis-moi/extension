import {
  Contributor,
  contributorIsSubscribed,
  sortSuggestedContributors,
  StatefulContributor
} from 'app/lmem/contributor';
import { OptionsState } from '../reducers';
import { createSelector } from 'reselect';
import * as R from 'ramda';

export const getContributors = (state: OptionsState): StatefulContributor[] =>
  state.contributors;

export const getSubscriptions = createSelector(
  [getContributors],
  R.filter(contributorIsSubscribed)
);

export const getContributorsSuggestions = createSelector(
  [getContributors],
  sortSuggestedContributors
);

export const makeGetNContributorsSuggestions = (n: number) =>
  createSelector<OptionsState, Contributor[], Contributor[]>(
    [getContributorsSuggestions],
    R.take(n)
  );
