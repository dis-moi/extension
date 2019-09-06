import { getContributors } from './resources';
import { BackgroundState } from '../reducers';
import { createSelector } from 'reselect';
import { Contributor, StatefulContributor } from '../../lmem/contributor';
import * as R from 'ramda';

export const getSubscriptions = (state: BackgroundState) => state.subscriptions;

const addSubscriptionState = (subscriptions: number[]) => (
  contributor: Contributor
): StatefulContributor =>
  R.assoc('subscribed', subscriptions.includes(contributor.id), contributor);

export const getContributorsWithSubscriptionState = createSelector(
  [getContributors, getSubscriptions],
  (contributors: Contributor[], subscriptions: number[]) =>
    R.map(addSubscriptionState(subscriptions), contributors)
);
