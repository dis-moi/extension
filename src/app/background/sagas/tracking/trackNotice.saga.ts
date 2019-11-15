import { SagaIterator } from '@redux-saga/types';
import { call, select } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import truncate from 'app/utils/truncate';
import { stripHtml } from 'app/utils/stripHtml';
import {
  createErrorAction,
  FeedbackOnNoticeAction,
  getURLFromActionMeta,
  NoticeDisplayedAction,
  OutboundLinkClickedAction,
  UnfoldNoticeAction,
  NoticeBadgedAction
} from 'app/actions';
import {
  getNoticeById,
  getNumberOfUnreadNoticesOnTab
} from 'app/background/selectors';
import { getNumberOfNoticesOnTab } from 'app/background/selectors/tabs';

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
      createErrorAction()(e);
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
      createErrorAction()(e);
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
      createErrorAction()(e);
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
      createErrorAction()(e);
    }
  };

export const trackNoticeOutboundClickSaga = (tracker: Tracker) =>
  function*(action: OutboundLinkClickedAction): SagaIterator {
    try {
      if (action.meta.url) {
        yield call(tracker.trackOutboundLink, {
          url: action.meta.url
        });
      }
    } catch (e) {
      createErrorAction()(e);
    }
  };
