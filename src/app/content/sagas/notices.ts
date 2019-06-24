import { put, takeLatest, select } from 'redux-saga/effects';

import { getNotices, getTab, hasNoticesToDisplay } from '../selectors';
import { noticesUpdated, updateNoticesFailed } from '../../actions/notices';
import { close } from '../../actions/ui';

export function* updateNoticesSaga() {
  try {
    const notices = yield select(getNotices);
    const tab = yield select(getTab);
    yield put(noticesUpdated(notices, { tab, sendToBackground: true }));

    const hasNotices = yield select(hasNoticesToDisplay);
    if (!hasNotices) {
      yield put(close());
    }
  } catch (e) {
    yield put(updateNoticesFailed(e));
  }
}

export default function* noticesRootSaga() {
  yield takeLatest(['READ_NOTICE', 'FEEDBACK_ON_NOTICE'], updateNoticesSaga);
}
