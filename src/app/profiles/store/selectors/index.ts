import { createSelector } from 'reselect';
import * as RA from 'ramda-adjunct';
import { findItemById } from 'libs/utils/findItemById';
import {
  Contributor,
  ContributorId,
  contributorIsSubscribed,
  StatefulContributor
} from 'libs/domain/contributor';
import { Subscription, Subscriptions } from 'libs/domain/subscription';
import { Notice, NoticeWithContributor } from 'libs/domain/notice';
import { makeGetRouteParam } from 'libs/store/selectors';
import { getIndexedFetchedAll } from 'libs/store/collection/selectors';
import { ProfilesState } from '../reducers';
import famousContributors from '../../App/famousContributors';
import { getSubscriptions } from './subscriptions';
import { getNotices as getNoticesItems, getNoticesCollection } from './notices';
import { getContributors } from './contributors';

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
        statefulContributor.id &&
        statefulContributor.id !== Number(id)
    )
);

export const getFamousContributors = createSelector(
  getStatefulContributors,
  statefulContributors => {
    const ordonedContributors: StatefulContributor[] = [];
    famousContributors &&
      famousContributors.forEach(id =>
        statefulContributors.find(
          contributor =>
            id === contributor.id && ordonedContributors.push(contributor)
        )
      );
    return ordonedContributors;
  }
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

export const getFeaturedNotices = createSelector(
  [getContributorFromRouteParam],
  contributor => contributor?.contribution?.pinnedNotices || []
);

export const enhanceNotice = (contributors: Contributor[]) => (
  noticeItem: Notice
): NoticeWithContributor => ({
  ...noticeItem,
  contributor:
    'contributor' in noticeItem
      ? noticeItem.contributor
      : (contributors.find(
          contributor => noticeItem.contributorId === contributor.id
        ) as Contributor),
  relayers:
    'relayers' in noticeItem
      ? noticeItem.relayers
      : ((noticeItem.relayersIds || [])
          .map((relayerId: ContributorId) =>
            contributors.find(contributor => relayerId === contributor.id)
          )
          .filter(RA.isNotNil) as Contributor[])
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

export const getNoticesForContributorId = createSelector(
  [getNotices, (_: unknown, contributorId: ContributorId) => contributorId],
  (notices, contributorId) =>
    notices.filter(notice => notice.contributor.id === Number(contributorId))
);

export const getContributorById = (id: number) =>
  createSelector([getContributors], findItemById(id));

export const getFeaturedNoticesIds = createSelector(
  [getFeaturedNotices],
  featuredNotices => featuredNotices.map(({ id }) => id)
);

export const getContributorNoticesButFeaturedOnes = createSelector(
  [getFeaturedNoticesIds, getContributorNotices],
  (featuredNoticesIds, notices) =>
    notices.filter(({ id }) => !featuredNoticesIds.includes(id))
);

export const areContributorNoticesAllFetched = createSelector(
  [
    getNoticesCollection,
    (state: ProfilesState, contributorId: ContributorId) => contributorId
  ],
  getIndexedFetchedAll
);
