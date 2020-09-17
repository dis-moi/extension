import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_NOTICES_REQUEST, fetchNoticesRequest } from 'app/actions';
import fetchNoticesSaga from 'app/store/sagas/fetchNotices.saga';
import {
  FETCH_CONTRIBUTOR_NOTICES,
  FETCH_MORE_CONTRIBUTOR_NOTICES,
  FetchContributorNoticesAction,
  FetchMoreContributorNoticesAction
} from '../actions/notices';
import { getNoticesFetchedCountForContributorId } from '../selectors/notices';

export const CONTRIBUTOR_NOTICES_BY_PAGE = 10;

function* fetchContributorNoticesSaga({
  payload: contributorId
}: FetchContributorNoticesAction) {
  yield put(
    fetchNoticesRequest({
      contributor: contributorId
    })
  );
}

function* fetchMoreContributorNoticesSaga({
  payload: contributorId
}: FetchMoreContributorNoticesAction) {
  const fetchedCount = yield select(
    getNoticesFetchedCountForContributorId,
    contributorId
  );
  yield put(
    fetchNoticesRequest({
      contributor: contributorId,
      offset: fetchedCount
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
