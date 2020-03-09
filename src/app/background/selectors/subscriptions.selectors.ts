import { getContributors } from './resources';
import { createSelector } from 'reselect';
import {
  Contributor,
  createContributorExists,
  StatefulContributor
} from 'app/lmem/contributor';
import * as R from 'ramda';
import { StateWithSubscriptions } from 'app/background/reducers';

export const getSubscriptions = (state: StateWithSubscriptions) =>
  state.subscriptions;

export const getActiveSubscriptions = createSelector(
  [getSubscriptions, getContributors],
  (subscriptions, contributors) =>
    R.filter(createContributorExists(contributors), subscriptions)
);

const addSubscriptionState = (subscriptions: number[]) => (
  contributor: Contributor
): StatefulContributor =>
  R.assoc('subscribed', subscriptions.includes(contributor.id), contributor);

export const getContributorsWithSubscriptionState = createSelector(
  [getContributors, getSubscriptions],
  (contributors: Contributor[], subscriptions: number[]) =>
    R.map(addSubscriptionState(subscriptions), contributors)
);

export const getNbSubscriptions = createSelector(
  [getActiveSubscriptions],
  subscriptions => subscriptions.length
);
