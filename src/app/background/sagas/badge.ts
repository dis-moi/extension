import { SagaIterator } from 'redux-saga';
import { takeLatest, call, select } from 'redux-saga/effects';
import { BadgeTheme, updateBadge } from 'app/lmem/badge';
import {
  FeedbackOnNoticeAction,
  MarkNoticeReadAction,
  NoticesFoundAction,
  badgeUpdateFailed,
  AppAction
} from 'app/actions';
import { ReceivedAction } from 'webext/createMessageHandler';
import { getNumberOfNoticesOnTab } from '../selectors/tabs';
import { getNumberOfUnreadNoticesOnTab } from '../selectors';

type BadgeImpactingAction = (
  | MarkNoticeReadAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction) &
  ReceivedAction;
export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*(action: BadgeImpactingAction): SagaIterator {
    try {
      if (
        action.type === 'LMEM/CONTEXT_NOT_TRIGGERED' ||
        action.type === 'NO_NOTICES_DISPLAYED'
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
  action.type === 'MARK_NOTICE_READ' ||
  action.type === 'NOTICES_FOUND' ||
  action.type === 'FEEDBACK_ON_NOTICE' ||
  action.type === 'LMEM/CONTEXT_NOT_TRIGGERED' ||
  action.type === 'NO_NOTICES_DISPLAYED';

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest(isActionImpactingBadge, updateBadgeSaga(badgeTheme));
  };
