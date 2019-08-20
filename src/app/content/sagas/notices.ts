import { all, put, select, takeLatest } from 'redux-saga/effects';
import { getNotices, getTab, hasNoticesToDisplay } from '../selectors';
import {
  markNoticeRead,
  noticesUpdated,
  updateNoticesFailed
} from 'app/actions/notices';
import { close } from '../../actions/ui';
import { CLOSED } from 'app/constants/ActionTypes';
import { StatefulNotice } from 'app/lmem/notice';
import { CloseCause } from '../../lmem/ui';
import { AppAction } from '../../actions';

export function* updateNoticesSaga() {
  try {
    const notices = yield select(getNotices);
    const tab = yield select(getTab);
    yield put(noticesUpdated(notices, { tab, sendToBackground: true }));

    const hasNotices = yield select(hasNoticesToDisplay);
    if (!hasNotices) {
      yield put(close(CloseCause.NoMoreNotice));
    }
  } catch (e) {
    yield put(updateNoticesFailed(e));
  }
}

export function* markNoticesReadSaga() {
  const notices = yield select(getNotices);
  yield all(notices.map(({ id }: StatefulNotice) => put(markNoticeRead(id))));
}

const isClosedByButtonAction = (action: AppAction) =>
  action.type === CLOSED && action.payload.cause === CloseCause.CloseButton;

export default function* noticesRootSaga() {
  yield all([
    // FIXME change all strings to constants because it’s a pain the ass to refactor (i.e. rename)
    yield takeLatest(
      ['MARK_NOTICE_READ', 'FEEDBACK_ON_NOTICE'],
      updateNoticesSaga
    ),
    yield takeLatest(isClosedByButtonAction, markNoticesReadSaga)
  ]);
}
