import { put, takeLatest, select } from 'redux-saga/effects';
import { getNotices, getTab } from '../selectors';
import { noticesUpdated, updateNoticesFailed } from '../../actions/notices';

export function* updateNoticesSaga() {
  try {
    const notices = yield select(getNotices);
    const tab = yield select(getTab);
    yield put(noticesUpdated(notices, { tab, sendToBackground: true }));
  } catch (e) {
    yield put(updateNoticesFailed(e));
  }
}

export default function* noticesRootSaga() {
  yield takeLatest(['READ_NOTICE', 'FEEDBACK_ON_NOTICE'], updateNoticesSaga);
}
