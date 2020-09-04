import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_NOTICES_REQUEST, fetchNoticesRequest } from 'app/actions';
import fetchNoticesSaga from 'app/store/sagas/fetchNotices.saga';
import {
  FETCH_CONTRIBUTOR_NOTICES,
  FETCH_MORE_CONTRIBUTOR_NOTICES,
  FetchContributorNoticesAction,
  FetchMoreContributorNoticesAction
} from '../actions/notices';
import { getNoticesOffset } from '../selectors/notices';

export const CONTRIBUTOR_NOTICES_BY_PAGE = 10;

function* fetchContributorNoticesSaga({
  payload: contributorId
}: FetchContributorNoticesAction) {
  yield put(
    fetchNoticesRequest({
      contributor: contributorId,
      limit: CONTRIBUTOR_NOTICES_BY_PAGE,
      offset: 0
    })
  );
}

function* fetchMoreContributorNoticesSaga({
  payload: contributorId
}: FetchMoreContributorNoticesAction) {
  const offset =
    CONTRIBUTOR_NOTICES_BY_PAGE +
    (yield select(getNoticesOffset, contributorId));
  yield put(
    fetchNoticesRequest({
      contributor: contributorId,
      offset
    })
  );
}

export default function* noticesRootSaga() {
  yield takeLatest(FETCH_CONTRIBUTOR_NOTICES, fetchContributorNoticesSaga);
  yield takeLatest(
    FETCH_MORE_CONTRIBUTOR_NOTICES,
    fetchMoreContributorNoticesSaga
  );
  yield takeEvery(FETCH_NOTICES_REQUEST, fetchNoticesSaga);
}
