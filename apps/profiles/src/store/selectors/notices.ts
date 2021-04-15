import { ProfilesState } from 'apps/profiles/store/reducers';
import { createSelector } from 'reselect';
import {
  getIndexedOffset,
  isCollectionLoading
} from 'libs/store/collection/selectors';
import { ContributorId } from 'libs/lmem/contributor';

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading(noticesCollection)
);
export const getNotices = createSelector(
  [getNoticesCollection],
  noticesCollection => noticesCollection.items
);

export const getNoticesOffset = createSelector(
  [
    getNoticesCollection,
    (state: ProfilesState, contributorId: ContributorId) => contributorId
  ],
  getIndexedOffset
);
