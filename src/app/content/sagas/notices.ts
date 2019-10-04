import { all, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { getNotices, hasNoticesToDisplay } from '../selectors';
import { markNoticeRead, UnfoldNoticeAction } from 'app/actions/notices';
import { close } from 'app/actions/ui';
import { CLOSED } from 'app/constants/ActionTypes';
import { StatefulNotice } from 'app/lmem/notice';
import { CloseCause } from '../../lmem/ui';
import { AppAction, createErrorAction } from '../../actions';

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
  yield put(
    markNoticeRead(unfoldNoticeAction.payload, { sendToBackground: true })
  );
}

export const isClosedByButtonAction = (action: AppAction) =>
  action.type === CLOSED && action.payload.cause === CloseCause.CloseButton;

export const isChangeOnNoticeAction = (action: AppAction) =>
  action.type === 'MARK_NOTICE_READ' || action.type === 'FEEDBACK_ON_NOTICE';

export default function* noticesRootSaga() {
  yield all([
    // FIXME change all strings to constants because it’s a pain the ass to refactor (i.e. rename)
    yield takeLatest(isChangeOnNoticeAction, closeIfNoMoreNoticeToDisplaySaga),
    yield takeLatest(isClosedByButtonAction, markNoticesReadSaga),
    yield takeEvery('UNFOLD_NOTICE', markNoticeReadSaga)
  ]);
}
