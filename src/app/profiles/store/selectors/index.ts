import { createSelector } from 'reselect';
import { findItemById } from 'app/utils/findItemById';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import { Notice } from 'app/lmem/notice';
import { ProfilesState } from 'app/profiles/store/reducers';
import { makeGetRouteParam } from 'app/store/selectors';
import { isCollectionLoading } from 'app/store/collection/selectors';

export const getContributorsCollection = (state: ProfilesState) =>
  state.contributors;

export const getContributors = createSelector(
  [getContributorsCollection],
  contributorsCollection => contributorsCollection.items
);

export const getContributorFromRouteParam = createSelector(
  [getContributors, makeGetRouteParam('id')],
  (contributors, id) =>
    findItemById<StatefulContributor>(Number(id))(contributors)
);

export const areContributorsLoading = createSelector(
  [getContributorsCollection],
  contributorsCollection =>
    isCollectionLoading<Contributor>(contributorsCollection)
);

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading<Notice>(noticesCollection)
);
export const getNotices = createSelector(
  [getNoticesCollection],
  noticesCollection => noticesCollection.items
);

export const getContributorNoticesFromRouteParam = createSelector(
  [makeGetRouteParam('id'), getNotices],
  (contributorId, notices) =>
    notices.filter(notice => notice.contributor.id === Number(contributorId))
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));
