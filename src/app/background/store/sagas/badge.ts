import { SagaIterator } from 'redux-saga';
import { takeLatest, call, select } from 'redux-saga/effects';
import { BadgeTheme, updateBadge, resetBadge } from 'app/lmem/badge';
import {
  FeedbackOnNoticeAction,
  MarkNoticeReadAction,
  NoticesFoundAction,
  badgeResetFailed,
  badgeUpdateFailed,
  AppAction,
  TabAction
} from 'app/actions';
import { ReceivedAction } from 'webext/createMessageHandler';
import { getTabNoticesToDisplay } from '../selectors/noticesInTabs.selectors';
import * as R from 'ramda';

type BadgeImpactingAction = (
  | MarkNoticeReadAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction) &
  ReceivedAction;
export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*(action: BadgeImpactingAction): SagaIterator {
    console.log('in updateBadgeSaga');
    try {
      console.log('WHHHHHHHHHHHHHHHAT');
      const state = yield select(R.identity);

      console.log('state', state);

      const not = getTabNoticesToDisplay(state, { tab: action.meta.tab });

      console.log('not', not);

      const noticesToDisplay = yield select(getTabNoticesToDisplay, {
        tab: action.meta.tab
      });
      console.log('notices to badge', noticesToDisplay);
      yield call(updateBadge, noticesToDisplay, badgeTheme, action.meta.tab.id);
    } catch (e) {
      badgeUpdateFailed(e);
    }
  };

export function* resetBadgeSaga({ meta: { tab } }: TabAction): SagaIterator {
  try {
    resetBadge(tab.id);
  } catch (e) {
    badgeResetFailed(e);
  }
}

const isTabChangedAction = (action: AppAction): boolean =>
  action.type === 'BROWSER/TAB_CREATED' ||
  action.type === 'BROWSER/TAB_UPDATED';

const isActionImpactingBadge = (action: AppAction): boolean => {
  console.log('===> ', action.type);
  console.log(
    'so ? ',
    action.type === 'MARK_NOTICE_READ' ||
      action.type === 'NOTICES_FOUND' ||
      action.type === 'FEEDBACK_ON_NOTICE'
  );
  return (
    action.type === 'MARK_NOTICE_READ' ||
    action.type === 'NOTICES_FOUND' ||
    action.type === 'FEEDBACK_ON_NOTICE'
  );
};

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest(isActionImpactingBadge, updateBadgeSaga(badgeTheme));
    yield takeLatest(isTabChangedAction, resetBadgeSaga);
  };
