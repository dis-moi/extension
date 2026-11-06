import { createSelector } from 'reselect';
import { isCollectionLoading } from 'libs/store/collection/selectors';
import { sortContributorsBySubscribers } from '@dismoi/domain/contributor';
import { findItemById } from 'libs/utils/findItemById';
import sortByLocale from 'libs/utils/sortByLocale';
import { ProfilesState } from '../reducers';
import { getLocale } from './locale';

export const getContributorsCollection = (state: ProfilesState) =>
  state.contributors;

export const getContributors = createSelector(
  [getContributorsCollection, getLocale],
  (contributorsCollection, locale) =>
    sortByLocale(
      sortContributorsBySubscribers(contributorsCollection.items),
      locale,
    ),
);

export const areContributorsLoading = createSelector(
  [getContributorsCollection],
  (contributorsCollection) => isCollectionLoading(contributorsCollection),
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
