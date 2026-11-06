import { createSelector } from 'reselect';
import { ProfilesState } from 'app/profiles/store/reducers';
import {
  getIndexedOffset,
  isCollectionLoading,
} from 'libs/store/collection/selectors';
import { ContributorId } from '@dismoi/domain/contributor';
import sortByLocale from 'libs/utils/sortByLocale';
import { getLocale } from './locale';

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  (noticesCollection) => isCollectionLoading(noticesCollection),
);
export const getNotices = createSelector(
  [getNoticesCollection, getLocale],
  (noticesCollection, locale) => sortByLocale(noticesCollection.items, locale),
);

export const getNoticesOffset = createSelector(
  [
    getNoticesCollection,
    (state: ProfilesState, contributorId: ContributorId) => contributorId,
  ],
  getIndexedOffset,
);
