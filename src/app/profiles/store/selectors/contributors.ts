import { createSelector } from 'reselect';
import { ProfilesState } from '../reducers';
import { isCollectionLoading } from 'app/store/collection/selectors';
import { sortContributorsByContributions } from 'app/lmem/contributor';
import { findItemById } from 'app/utils/findItemById';

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
