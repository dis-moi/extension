/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SagaIterator } from '@redux-saga/types';
import { call, put, select } from '@redux-saga/core/effects';
import PostHog from 'posthog-node';
import {
  BaseAction,
  FeedbackOnNoticeAction,
  getURLFromActionMeta,
  NoticeBadgedAction,
  NoticeDisplayedAction,
  ReceivedOutboundLinkClickedAction,
  UnfoldNoticeAction,
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import {
  getNoticeById,
  getNumberOfUnreadNoticesOnTab,
} from 'app/background/store/selectors';
import {
  getNoticeFieldsToTrack,
  getRelayer,
  StatefulNoticeWithContributor,
} from 'libs/domain/notice';
import { getSubscriptionsIds } from 'app/background/store/selectors/subscriptions.selectors';
import { Contributor } from 'libs/domain/contributor';
import { loginSaga } from '../../user.saga';
import { getEventNameFromAction } from './';

export const getPropertiesToTrack = (
  action: BaseAction,
  notice: StatefulNoticeWithContributor,
  subscriptionsIds: Contributor['id'][]
) => ({
  noticeId: notice.id,
  notice: getNoticeFieldsToTrack(notice),
  relayer: getRelayer(subscriptionsIds, notice),
  $current_url: getURLFromActionMeta(action),
});

export const trackNoticeBadgedSaga = (client: PostHog) =>
  function* (action: NoticeBadgedAction): SagaIterator {
    try {
      if (action.meta.tab) {
        const distinctId = yield call(loginSaga);
        const notice = yield select(getNoticeById(action.payload));
        const unreadNoticesNumber = yield select(
          getNumberOfUnreadNoticesOnTab(action.meta.tab.id)
        );
        const subscriptionsIds = yield select(getSubscriptionsIds);
        const color = unreadNoticesNumber > 0 ? 'blue' : 'grey';
        // @ts-ignore
        yield call(client.capture.bind(client), {
          distinctId,
          event: getEventNameFromAction(action),
          properties: {
            color,
            ...getPropertiesToTrack(action, notice, subscriptionsIds),
          },
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeDisplayedSaga = (client: PostHog) =>
  function* (action: NoticeDisplayedAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      const subscriptionsIds = yield select(getSubscriptionsIds);
      const distinctId = yield call(loginSaga);
      // @ts-ignore
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: getPropertiesToTrack(action, notice, subscriptionsIds),
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeUnfoldedSaga = (client: PostHog) =>
  function* (action: UnfoldNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      const subscriptionsIds = yield select(getSubscriptionsIds);
      const distinctId = yield call(loginSaga);
      // @ts-ignore
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: getPropertiesToTrack(action, notice, subscriptionsIds),
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeFeedbackSaga = (client: PostHog) =>
  function* (action: FeedbackOnNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload.id));
      const subscriptionsIds = yield select(getSubscriptionsIds);
      const distinctId = yield call(loginSaga);
      // @ts-ignore
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          interaction: action.payload.feedback,
          ...getPropertiesToTrack(action, notice, subscriptionsIds),
        },
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeOutboundClickSaga = (client: PostHog) =>
  function* (action: ReceivedOutboundLinkClickedAction): SagaIterator {
    try {
      if (action.meta.tab.url) {
        const notice = yield select(getNoticeById(action.payload.id));
        const subscriptionsIds = yield select(getSubscriptionsIds);
        const distinctId = yield call(loginSaga);
        // @ts-ignore
        yield call(client.capture.bind(client), {
          distinctId,
          event: getEventNameFromAction(action),
          properties: getPropertiesToTrack(action, notice, subscriptionsIds),
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
