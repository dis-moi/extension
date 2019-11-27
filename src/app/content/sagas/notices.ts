import { all, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as R from 'ramda';
import { StatefulNotice } from 'app/lmem/notice';
import { CloseCause } from 'app/lmem/ui';
import { getNotices, hasNoticesToDisplay, isOpen } from '../selectors';
import {
  close,
  createErrorAction,
  markNoticeRead,
  CLOSED,
  FEEDBACK_ON_NOTICE,
  MARK_NOTICE_READ,
  NO_NOTICES_DISPLAYED,
  CONTEXT_NOT_TRIGGERED,
  NOTICE_UNFOLDED,
  ClosedAction,
  AppAction,
  UnfoldNoticeAction
} from 'app/actions';

export function* closeIfNoMoreNoticeToDisplaySaga() {
  try {
    const hasNotices = yield select(hasNoticesToDisplay);
    if (!hasNotices) {
      yield put(close(CloseCause.NoMoreNotice));
    }
  } catch (e) {
    yield put(createErrorAction()(e));
  }
}

function* markNoticesReadSaga() {
  const notices = yield select(getNotices);
  yield all(
    notices.map(({ id }: StatefulNotice) =>
      put(markNoticeRead(id, { sendToBackground: true }))
    )
  );
}

function* markNoticeReadSaga(unfoldNoticeAction: UnfoldNoticeAction) {
  const notices = yield select(getNotices);
  const unfoldedNotice: StatefulNotice = notices.find(
    R.propEq('id', unfoldNoticeAction.payload)
  );
  if (!unfoldedNotice.state.read) {
    yield put(
      markNoticeRead(unfoldNoticeAction.payload, { sendToBackground: true })
    );
  }
}

export const isClosedByButtonAction = (action: AppAction) =>
  action.type === CLOSED &&
  (action as ClosedAction).payload.cause === CloseCause.CloseButton;

export const isChangeOnNoticeAction = (action: AppAction) =>
  action.type === MARK_NOTICE_READ || action.type === FEEDBACK_ON_NOTICE;

function* closeUISaga() {
  const open = yield select(isOpen);
  if (open) {
    yield put(close(CloseCause.NoMoreNotice));
  }
}

export default function* noticesRootSaga() {
  yield all([
    takeLatest(isChangeOnNoticeAction, closeIfNoMoreNoticeToDisplaySaga),
    takeLatest(isClosedByButtonAction, markNoticesReadSaga),
    takeEvery(NOTICE_UNFOLDED, markNoticeReadSaga),
    takeEvery([NO_NOTICES_DISPLAYED, CONTEXT_NOT_TRIGGERED], closeUISaga)
  ]);
}
