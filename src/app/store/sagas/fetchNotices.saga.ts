import { call, put } from 'redux-saga/effects';
import {
  fetchNoticesFailure,
  FetchNoticesRequestAction,
  noticesFetched
} from 'app/actions';
import { fetchNotices } from 'api/fetchNotice';

export default function* fetchNoticesSaga({
  payload: noticesUrls
}: FetchNoticesRequestAction) {
  try {
    const notices = yield call(fetchNotices, noticesUrls);

    yield put(noticesFetched(notices));
  } catch (e) {
    yield put(fetchNoticesFailure(e, {}));
  }
}
