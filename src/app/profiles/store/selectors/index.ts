import { createSelector } from 'reselect';
import { findItemById } from 'app/utils/findItemById';
import {
  Contributor,
  contributorIsSubscribed,
  StatefulContributor
} from 'app/lmem/contributor';
import { Subscription, Subscriptions } from 'app/lmem/subscription';
import { Notice, NoticeItem } from 'app/lmem/notice';
import { makeGetRouteParam } from 'app/store/selectors';
import { getContributors } from './contributors';
import { getNotices as getNoticesItems } from './notices';
import { getSubscriptions } from './subscriptions';

export const createContributorEnhancer = (subscriptions: Subscriptions) => (
  contributor: Contributor
): StatefulContributor => ({
  ...contributor,
  subscribed:
    subscriptions.findIndex(
      (subscription: Subscription) => subscription === contributor.id
    ) !== -1
});

export const enhanceContributors = (
  contributors: Contributor[],
  subscriptions: Subscriptions
): StatefulContributor[] =>
  contributors.map(createContributorEnhancer(subscriptions));

export const getStatefulContributors = createSelector(
  [getContributors, getSubscriptions],
  enhanceContributors
);

export const getSimilarContributors = createSelector(
  [getStatefulContributors, makeGetRouteParam('id')],
  (statefulContributors, id) =>
    statefulContributors.filter(
      statefulContributor =>
        !contributorIsSubscribed(statefulContributor) &&
        statefulContributor.id !== Number(id)
    )
);

export const getSubscribedContributors = createSelector(
  [getStatefulContributors],
  enhancedContributors =>
    enhancedContributors.filter(({ subscribed }) => subscribed)
);

export const getContributorFromRouteParam = createSelector(
  [getStatefulContributors, makeGetRouteParam('id')],
  (contributors, id) => findItemById<Contributor>(Number(id))(contributors)
);

export const getFeaturedNoticeId = createSelector(
  [getContributorFromRouteParam],
  contributor => contributor?.contribution?.example?.noticeId
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
  [getNoticesItems, getContributors],
  (noticesItems, contributors) => noticesItems.map(enhanceNotice(contributors))
);

export const getContributorNotices = createSelector(
  [makeGetRouteParam('id'), getNotices],
  (contributorId, notices) =>
    notices.filter(notice => notice?.contributor?.id === Number(contributorId))
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));

export const getFeaturedNotice = createSelector(
  [getFeaturedNoticeId, getNotices],
  (featuredNoticeId, notices) =>
    notices.find(({ id }) => id === featuredNoticeId)
);

export const getContributorNoticesButFeaturedOne = createSelector(
  [getFeaturedNoticeId, getContributorNotices],
  (featuredNoticeId, notices) =>
    notices.filter(({ id }) => id !== featuredNoticeId)
);
