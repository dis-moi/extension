import { createSelector } from 'reselect';
import { ProfilesState } from 'app/profiles/store/reducers';
import { isCollectionLoading } from 'app/store/collection/selectors';

export const getSubscriptionsCollection = (state: ProfilesState) =>
  state.subscriptions;

export const areSubscriptionsLoading = createSelector(
  [getSubscriptionsCollection],
  subscriptionsCollection => isCollectionLoading(subscriptionsCollection)
);

export const getSubscriptions = createSelector(
  [getSubscriptionsCollection],
  subscriptionsCollection => subscriptionsCollection.items
);
