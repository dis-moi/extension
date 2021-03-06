import { createSelector } from 'reselect';
import * as R from 'ramda';
import { Contributor, StatefulContributor } from 'libs/domain/contributor';
import { StateWithSubscriptions } from 'app/background/store/reducers';
import { getContributors } from './resources';

export const getSubscriptions = (state: StateWithSubscriptions) =>
  state.subscriptions;

export const getSubscriptionsIds = getSubscriptions;

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
