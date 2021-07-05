import { createSelector } from 'reselect';
import { isCollectionLoading } from 'libs/store/collection/selectors';
import { sortContributorsBySubscribers } from 'libs/domain/contributor';
import { findItemById } from 'libs/utils/findItemById';
import { getCurrentLng } from 'libs/i18n';
import sortByLocale from 'libs/utils/sortByLocale';
import { ProfilesState } from '../reducers';

export const getContributorsCollection = (state: ProfilesState) =>
  state.contributors;

export const getContributors = createSelector(
  [getContributorsCollection],
  contributorsCollection =>
    sortByLocale(
      sortContributorsBySubscribers(contributorsCollection.items),
      getCurrentLng()
    )
);

export const areContributorsLoading = createSelector(
  [getContributorsCollection],
  contributorsCollection => isCollectionLoading(contributorsCollection)
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
