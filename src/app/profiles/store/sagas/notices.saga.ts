import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_NOTICES_REQUEST, fetchNoticesRequest } from 'app/actions';
import {
  FETCH_CONTRIBUTOR_NOTICES,
  FetchContributorNoticesAction
} from '../actions/notices';
import fetchNoticesSaga from 'app/store/sagas/fetchNotices.saga';

function* fetchContributorNoticesSaga({
  payload: contributorId
}: FetchContributorNoticesAction) {
  yield put(
    fetchNoticesRequest({
      contributor: contributorId
    })
  );
}

export default function* noticesRootSaga() {
  yield takeLatest(FETCH_CONTRIBUTOR_NOTICES, fetchContributorNoticesSaga);
  yield takeLatest(FETCH_NOTICES_REQUEST, fetchNoticesSaga);
}
