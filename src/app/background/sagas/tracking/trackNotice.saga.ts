import { SagaIterator } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Tracker from 'types/Tracker';
import truncate from 'libs/utils/truncate';
import { stripHtml } from 'libs/utils/stripHtml';
import {
  FeedbackOnNoticeAction,
  getURLFromActionMeta,
  NoticeBadgedAction,
  NoticeDisplayedAction,
  ReceivedOutboundLinkClickedAction,
  UnfoldNoticeAction
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import {
  getNoticeById,
  getNumberOfUnreadNoticesOnTab
} from 'app/background/selectors';
import { getNumberOfNoticesOnTab } from 'app/background/selectors/tabs';
import { Level } from 'libs/utils/Logger';

export const trackNoticeBadgedSaga = (tracker: Tracker) =>
  function*(action: NoticeBadgedAction): SagaIterator {
    try {
      if (action.meta.tab) {
        const notice = yield select(getNoticeById(action.payload));
        const noticesNumber = yield select(
          getNumberOfNoticesOnTab(action.meta.tab.id)
        );
        const unreadNoticesNumber = yield select(
          getNumberOfUnreadNoticesOnTab(action.meta.tab.id)
        );
        yield call(tracker.trackContentImpression, {
          name: notice.id,
          piece: `( ${noticesNumber} ) *${
            unreadNoticesNumber > 0 ? 'blue' : 'grey'
          }*`,
          target: getURLFromActionMeta(action),
          url: getURLFromActionMeta(action)
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeDisplayedSaga = (tracker: Tracker) =>
  function*(action: NoticeDisplayedAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      yield call(tracker.trackContentImpression, {
        name: notice.id,
        piece: truncate(stripHtml(notice.message), 82),
        target: getURLFromActionMeta(action),
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeUnfoldedSaga = (tracker: Tracker) =>
  function*(action: UnfoldNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload));
      yield call(tracker.trackContentImpression, {
        name: notice.id,
        piece: stripHtml(notice.message),
        target: getURLFromActionMeta(action),
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeFeedbackSaga = (tracker: Tracker) =>
  function*(action: FeedbackOnNoticeAction): SagaIterator {
    try {
      const notice = yield select(getNoticeById(action.payload.id));
      yield call(tracker.trackContentInteraction, {
        name: notice.id,
        piece:
          action.payload.feedback === 'dismiss'
            ? truncate(stripHtml(notice.message), 82)
            : stripHtml(notice.message),
        target: getURLFromActionMeta(action),
        interaction: action.payload.feedback,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackNoticeOutboundClickSaga = (tracker: Tracker) =>
  function*(action: ReceivedOutboundLinkClickedAction): SagaIterator {
    try {
      if (action.meta.tab.url) {
        yield call(tracker.trackOutboundLink, {
          url: action.meta.tab.url
        });
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
