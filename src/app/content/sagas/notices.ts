import { put, takeLatest, select, all } from 'redux-saga/effects';
import { getNotices, getTab, hasNoticesToDisplay } from '../selectors';
import {
  noticesUpdated,
  updateNoticesFailed,
  markNoticeRead
} from 'app/actions/notices';
import { close } from '../../actions/ui';
import { CLOSED } from 'app/constants/ActionTypes';
import { StatefulNotice } from 'app/lmem/notice';

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

export function* markNoticesReadSaga() {
  // FIXME find out if we need to guard some cases so we don’t accidentally mark read notices on some close cases.
  const notices = yield select(getNotices);
  yield all(notices.map(({ id }: StatefulNotice) => put(markNoticeRead(id))));
}

export default function* noticesRootSaga() {
  yield all([
    // FIXME change all strings to constants because it’s a pain the ass to refactor (i.e. rename)
    yield takeLatest(
      ['MARK_NOTICE_READ', 'FEEDBACK_ON_NOTICE'],
      updateNoticesSaga
    ),
    yield takeLatest([CLOSED], markNoticesReadSaga)
  ]);
}
