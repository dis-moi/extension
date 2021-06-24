import { createSelector } from 'reselect';
import { ProfilesState } from 'app/profiles/store/reducers';
import {
  getIndexedOffset,
  isCollectionLoading
} from 'libs/store/collection/selectors';
import { ContributorId } from 'libs/domain/contributor';
import sortByLocale from 'libs/utils/sortByLocale';
import { getCurrentLng } from 'libs/i18n';

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading(noticesCollection)
);
export const getNotices = createSelector(
  [getNoticesCollection],
  noticesCollection => sortByLocale(noticesCollection.items, getCurrentLng())
);

export const getNoticesOffset = createSelector(
  [
    getNoticesCollection,
    (state: ProfilesState, contributorId: ContributorId) => contributorId
  ],
  getIndexedOffset
);
