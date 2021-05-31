import { SagaIterator } from '@redux-saga/types';
import { call, put, select } from '@redux-saga/core/effects';
import PostHog from 'posthog-node';
import {
  FeedbackOnNoticeAction,
  getURLFromActionMeta,
  NoticeBadgedAction,
  NoticeDisplayedAction,
  ReceivedOutboundLinkClickedAction,
  UnfoldNoticeAction
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import {
  getNoticeById,
  getNumberOfUnreadNoticesOnTab
} from 'app/background/store/selectors';
import { loginSaga } from '../../user.saga';
import { getEventNameFromAction } from './';

export const trackNoticeBadgedSaga = (client: PostHog) =>
  function*(action: NoticeBadgedAction): SagaIterator {
    try {
      if (action.meta.tab) {
        const distinctId = yield call(loginSaga);
        const notice = yield select(getNoticeById(action.payload));
        const unreadNoticesNumber = yield select(
          getNumberOfUnreadNoticesOnTab(action.meta.tab.id)
        );
        const color = unreadNoticesNumber > 0 ? 'blue' : 'grey';
        yield call(client.capture.bind(client), {
          distinctId,
          event: getEventNameFromAction(action),
          properties: {
            noticeId: notice.id,
            color,
            $current_url: getURLFromActionMeta(action)
          }
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeDisplayedSaga = (client: PostHog) =>
  function*(action: NoticeDisplayedAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          noticeId: notice.id,
          $current_url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeUnfoldedSaga = (client: PostHog) =>
  function*(action: UnfoldNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          noticeId: notice.id,
          $current_url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeFeedbackSaga = (client: PostHog) =>
  function*(action: FeedbackOnNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload.id));
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          noticeId: notice.id,
          interaction: action.payload.feedback,
          $current_url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeOutboundClickSaga = (client: PostHog) =>
  function*(action: ReceivedOutboundLinkClickedAction): SagaIterator {
    try {
      if (action.meta.tab.url) {
        const distinctId = yield call(loginSaga);
        yield call(client.capture.bind(client), {
          distinctId,
          event: getEventNameFromAction(action),
          properties: {
            noticeId: action.payload.id,
            $current_url: action.payload.clickedUrl
          }
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
