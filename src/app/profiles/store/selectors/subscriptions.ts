import { createSelector } from 'reselect';
import { ProfilesState } from 'app/profiles/store/reducers';
import { isCollectionLoading } from 'app/store/collection/selectors';
import { Subscription } from 'app/lmem/subscription';

export const getSubscriptionsCollection = (state: ProfilesState) =>
  state.subscriptions;

export const areSubscriptionsLoading = createSelector(
  [getSubscriptionsCollection],
  subscriptionsCollection =>
    isCollectionLoading<Subscription>(subscriptionsCollection)
);

export const getSubscriptions = createSelector(
  [getSubscriptionsCollection],
  subscriptionsCollection => subscriptionsCollection.items
);
