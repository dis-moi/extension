import { select, put, takeLatest } from 'redux-saga/effects';
import { createMatchSelector, LOCATION_CHANGE } from 'connected-react-router';
import { FETCH_NOTICES_REQUEST, fetchNoticesRequest } from 'app/actions';
import {
  FETCH_CONTRIBUTOR_NOTICES,
  fetchContributorNotices,
  FetchContributorNoticesAction
} from '../actions/notices';
import { fetchContributorRequest } from 'app/actions/contributor';
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

function* locationChangeSaga() {
  const matchSelector = createMatchSelector('/les-contributeurs/:id');
  const match = yield select(matchSelector);
  if (match) {
    yield put(fetchContributorRequest(Number(match.params.id)));
    yield put(fetchContributorNotices(Number(match.params.id)));
  }
}

export default function* noticesRootSaga() {
  yield takeLatest(FETCH_CONTRIBUTOR_NOTICES, fetchContributorNoticesSaga);
  yield takeLatest(FETCH_NOTICES_REQUEST, fetchNoticesSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
}
