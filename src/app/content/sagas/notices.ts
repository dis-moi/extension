import { put, takeLatest, select } from 'redux-saga/effects';
import {
  getNotices,
  getTabId,
  hasNoticesToDisplay
} from '../selectors';
import { noticesUpdated } from '../../actions/notices';
import { close } from '../../actions/ui';

export function* updateNoticesSaga() {
  const notices = yield select(getNotices);
  const tab = yield select(getTabId);
  yield put(noticesUpdated(notices, { tab, sendToBackground: true }));

  const hasNotices = yield select(hasNoticesToDisplay);
  if (!hasNotices) {
    yield put(close());
  }
}

export default function* noticesRootSaga() {
  yield takeLatest(['READ_NOTICE', 'FEEDBACK_ON_NOTICE'], updateNoticesSaga);
}
