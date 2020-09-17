import { ProfilesState } from 'app/profiles/store/reducers';
import { createSelector } from 'reselect';
import {
  getFetchedCountForFilter,
  isCollectionLoading
} from 'app/store/collection/selectors';
import { Notice } from 'app/lmem/notice';
import { ContributorId } from 'app/lmem/contributor';

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading<Notice>(noticesCollection)
);
export const getNotices = createSelector(
  [getNoticesCollection],
  noticesCollection => noticesCollection.items
);

export const getNoticesFetchedCountForContributorId = createSelector(
  [
    getNoticesCollection,
    (state: ProfilesState, contributorId: ContributorId) => contributorId
  ],
  getFetchedCountForFilter
);
