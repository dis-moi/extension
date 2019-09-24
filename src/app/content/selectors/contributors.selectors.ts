import { createSelector } from 'reselect';
import * as R from 'ramda';
import { ContributorsState } from '../reducers/contributors.reducer';

export interface StateWithContributors {
  contributors: ContributorsState;
}

const getContributorsState = (
  state: StateWithContributors
): ContributorsState => state.contributors;

export const getNbTotalContributors = createSelector<
  StateWithContributors,
  ContributorsState,
  number | undefined
>(
  [getContributorsState],
  R.propOr(undefined, 'total')
);

export const getNbSubscribedContributors = createSelector<
  StateWithContributors,
  ContributorsState,
  number | undefined
>(
  [getContributorsState],
  R.propOr(undefined, 'subscribed')
);
