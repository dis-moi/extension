import { createSelector } from 'reselect';
import { findItemById } from 'app/utils/findItemById';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import { Notice, NoticeItem } from 'app/lmem/notice';
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

export const getFeaturedNoticeId = createSelector(
  [getContributorFromRouteParam],
  contributor => contributor?.contribution.example?.noticeId
);

export const areContributorsLoading = createSelector(
  [getContributorsCollection],
  contributorsCollection =>
    isCollectionLoading<Contributor>(contributorsCollection)
);

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading<NoticeItem>(noticesCollection)
);

export const enhanceNotice = (contributors: Contributor[]) => (
  noticeItem: NoticeItem
): Notice => ({
  ...noticeItem,
  // eslint-disable-next-line
  // @ts-ignore
  contributor: contributors.find(
    contributor => noticeItem.contributorId === contributor.id
  )
});

export const getNotices = createSelector(
  [getNoticesCollection, getContributors],
  (noticesCollection, contributors) =>
    noticesCollection.items.map(enhanceNotice(contributors))
);

export const getContributorNotices = createSelector(
  [makeGetRouteParam('id'), getNotices],
  (contributorId, notices) =>
    notices.filter(notice => notice.contributor.id === Number(contributorId))
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));

export const getFeaturedNotice = createSelector(
  [getFeaturedNoticeId, getNotices, getContributors],
  (featuredNoticeId, notices) =>
    notices.find(({ id }) => id === featuredNoticeId)
);

export const getContributorNoticesButFeaturedOne = createSelector(
  [getFeaturedNoticeId, getContributorNotices],
  (featuredNoticeId, notices) =>
    notices.filter(({ id }) => id !== featuredNoticeId)
);
