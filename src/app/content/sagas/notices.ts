import { put, takeLatest, select } from 'redux-saga/effects';
import { getNotices, getTabId } from '../selectors';
import {
  noticesUpdated,
  ReadNoticeAction,
  unfoldNotice
} from '../../actions/notices';

export function* updateNoticesSaga() {
  const notices = yield select(getNotices);
  const tab = yield select(getTabId);
  yield put(noticesUpdated(notices, { tab, sendToBackground: true }));
}

export function* rateUnfoldedNoticesSaga({
  payload: noticeId
}: ReadNoticeAction) {
  yield put(unfoldNotice(noticeId));
}

export default function* noticesRootSaga() {
  yield takeLatest(['READ_NOTICE', 'FEEDBACK_ON_NOTICE'], updateNoticesSaga);
  yield takeLatest('READ_NOTICE', rateUnfoldedNoticesSaga);
}
