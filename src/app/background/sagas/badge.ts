import { SagaIterator } from 'redux-saga';
import { takeLatest, call, select } from 'redux-saga/effects';
import { StatefulNotice } from 'app/lmem/notice';
import { BadgeTheme, updateBadge } from 'app/lmem/badge';
import {
  FeedbackOnNoticeAction,
  MarkNoticeReadAction,
  NoticesFoundAction,
  badgeUpdateFailed,
  AppAction
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
      if (
        action.type === 'LMEM/CONTEXT_NOT_TRIGGERED' ||
        action.type === 'NO_NOTICES_DISPLAYED'
      ) {
        yield call(updateBadge, [], badgeTheme, action.meta.tab.id);
        return;
      }

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
