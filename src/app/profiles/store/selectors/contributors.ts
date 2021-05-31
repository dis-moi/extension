import { createSelector } from 'reselect';
import { isCollectionLoading } from 'libs/store/collection/selectors';
import { sortContributorsByContributions } from 'libs/lmem/contributor';
import { findItemById } from 'libs/utils/findItemById';
import { ProfilesState } from '../reducers';

export const getContributorsCollection = (state: ProfilesState) =>
  state.contributors;

export const getContributors = createSelector(
  [getContributorsCollection],
  contributorsCollection =>
    sortContributorsByContributions(contributorsCollection.items)
);

export const areContributorsLoading = createSelector(
  [getContributorsCollection],
  contributorsCollection => isCollectionLoading(contributorsCollection)
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
