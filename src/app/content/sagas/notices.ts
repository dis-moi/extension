import { put, takeLatest, select } from 'redux-saga/effects';
import { getNotices, getTabId } from '../selectors';
import { noticesUpdated } from '../../actions/recommendations';

export function* updateNoticesSaga() {
  const notices = yield select(getNotices);
  const tab = yield select(getTabId);
  yield put(noticesUpdated(notices, { tab, sendToBackground: true }));
}

export default function* noticesRootSaga() {
  yield takeLatest('READ_NOTICE', updateNoticesSaga);
}
