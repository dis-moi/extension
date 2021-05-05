import { getContributors } from './resources';
import { createSelector } from 'reselect';
import { Contributor, StatefulContributor } from 'libs/lmem/contributor';
import * as R from 'ramda';
import { StateWithSubscriptions } from 'apps/background/src/reducers';

export const getSubscriptions = (state: StateWithSubscriptions) =>
  state.subscriptions;

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
  [getSubscriptions],
  subscriptions => subscriptions.length
);
