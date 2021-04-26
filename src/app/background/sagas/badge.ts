import { SagaIterator } from 'redux-saga';
import { call, select, takeLatest } from 'redux-saga/effects';
import { BadgeTheme, failBadge, resetBadge, updateBadge } from 'app/lmem/badge';
import { ReceivedAction } from 'webext/createMessageHandler';
import {
  AppAction,
  badgeUpdateFailed,
  CONTEXT_NOT_TRIGGERED,
  CONTEXT_TRIGGERED,
  ContextNotTriggeredAction,
  ContextTriggeredAction,
  FEEDBACK_ON_NOTICE,
  FeedbackOnNoticeAction,
  MARK_NOTICE_READ,
  MarkNoticeReadAction,
  NO_NOTICES_DISPLAYED,
  NoNoticesDisplayedAction,
  NOTICES_FOUND,
  NoticesFoundAction,
  ReceivedContributorsAction,
  ReceivedMatchingContextsAction,
  REFRESH_CONTRIBUTORS_FAILED,
  REFRESH_MATCHING_CONTEXTS_FAILED,
  RefreshContributorsFailedAction,
  RefreshMatchingContextsFailedAction,
  UPDATE_CONTRIBUTORS,
  UPDATE_MATCHING_CONTEXTS
} from 'app/actions';
import { getNumberOfNoticesOnTab } from '../selectors/tabs';
import { getNumberOfUnreadNoticesOnTab } from '../selectors';
import { ConnectivityStatus, selectStatus } from '../selectors/status.selector';

type BadgeImpactingAction = (
  | MarkNoticeReadAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction
  | ContextTriggeredAction
  | ContextNotTriggeredAction
  | NoNoticesDisplayedAction
  | RefreshMatchingContextsFailedAction
  | RefreshContributorsFailedAction
  | ReceivedMatchingContextsAction
  | ReceivedContributorsAction
) &
  ReceivedAction;
export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*(action: BadgeImpactingAction): SagaIterator {
    try {
      const status: ConnectivityStatus = yield select(selectStatus);

      if (status === 'FAILED') {
        yield call(failBadge, badgeTheme);
        return;
      } else {
        yield call(resetBadge);
      }

      if (
        action.type === CONTEXT_NOT_TRIGGERED ||
        action.type === NO_NOTICES_DISPLAYED
      ) {
        yield call(updateBadge, 0, 0, badgeTheme, action.meta.tab.id);
        return;
      }

      const noticesNumber = yield select(
        getNumberOfNoticesOnTab(action.meta.tab.id)
      );
      const unreadNoticesNumber = yield select(
        getNumberOfUnreadNoticesOnTab(action.meta.tab.id)
      );

      yield call(
        updateBadge,
        noticesNumber,
        unreadNoticesNumber,
        badgeTheme,
        action.meta.tab.id
      );
    } catch (e) {
      badgeUpdateFailed(e);
    }
  };

const isActionImpactingBadge = (action: AppAction): boolean =>
  action.type === MARK_NOTICE_READ ||
  action.type === NOTICES_FOUND ||
  action.type === FEEDBACK_ON_NOTICE ||
  action.type === CONTEXT_TRIGGERED ||
  action.type === CONTEXT_NOT_TRIGGERED ||
  action.type === NO_NOTICES_DISPLAYED ||
  action.type === REFRESH_MATCHING_CONTEXTS_FAILED ||
  action.type === UPDATE_MATCHING_CONTEXTS ||
  action.type === UPDATE_CONTRIBUTORS ||
  action.type === REFRESH_CONTRIBUTORS_FAILED;

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest(isActionImpactingBadge, updateBadgeSaga(badgeTheme));
  };
