import { put, takeLatest, select, all } from 'redux-saga/effects';
import { getNotices, getTabId } from '../selectors';
import { noticesUpdated, unfoldNotice } from '../../actions/notices';
import { Notice } from '../../lmem/notice';

export function* updateNoticesSaga() {
  const notices = yield select(getNotices);
  const tab = yield select(getTabId);
  yield put(noticesUpdated(notices, { tab, sendToBackground: true }));
}

export function* rateUnfoldedNoticesSaga() {
  const notices = yield select(getNotices);
  yield all(notices.map(({ id }: Notice) => put(unfoldNotice(id))));
}

export default function* noticesRootSaga() {
  yield takeLatest(['READ_NOTICE', 'FEEDBACK_ON_NOTICE'], updateNoticesSaga);
  yield takeLatest('READ_NOTICE', rateUnfoldedNoticesSaga);
}
