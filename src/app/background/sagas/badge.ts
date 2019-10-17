import { SagaIterator } from 'redux-saga';
import { takeLatest, call, select } from 'redux-saga/effects';
import { StatefulNotice } from 'app/lmem/notice';
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
import { getNoticesToDisplay } from '../selectors/prefs';

const noticeFromId = (id: number) =>
  ({
    id,
    message: '',
    contributor: { name: '' },
    intention: 'alternative',
    state: { dismissed: false, disliked: false }
  } as StatefulNotice);

type BadgeImpactingAction = (
  | MarkNoticeReadAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction) &
  ReceivedAction;
export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*(action: BadgeImpactingAction): SagaIterator {
    try {
      const notices =
        action.type === 'NOTICES_FOUND'
          ? (action as NoticesFoundAction).payload.notices
          : [
              noticeFromId(
                action.type === 'MARK_NOTICE_READ'
                  ? (action as MarkNoticeReadAction).payload
                  : (action as FeedbackOnNoticeAction).payload.id
              )
            ];

      /* FIXME (JAR): I don't like this because we don't really have real notices in `notices`
         but we may have { id: number } objects.
         It works because we only filter based on id, and then count them,
         but this is fragile and Im' not hayppy with it.
         I think we should maintain a list of actives notices for each tab. */

      const noticesToDisplay = yield select(getNoticesToDisplay(notices));

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

const isActionImpactingBadge = (action: AppAction): boolean =>
  action.type === 'MARK_NOTICE_READ' ||
  action.type === 'NOTICES_FOUND' ||
  action.type === 'FEEDBACK_ON_NOTICE';

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest(isActionImpactingBadge, updateBadgeSaga(badgeTheme));
    yield takeLatest(isTabChangedAction, resetBadgeSaga);
  };
