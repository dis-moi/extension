import { call, take, select, put, takeLatest } from 'redux-saga/effects';
import { createMatchSelector, LOCATION_CHANGE } from 'connected-react-router';
import {
  FETCH_NOTICES_REQUEST,
  fetchNoticesRequest,
  UPDATE_CONTRIBUTORS
} from 'app/actions';
import {
  FETCH_CONTRIBUTOR_NOTICES,
  fetchContributorNotices,
  FetchContributorNoticesAction
} from '../actions';
import { fetchContributorRequest } from 'app/actions/contributor';
import { getContributorById } from 'app/profiles/store/selectors';
import { ContributorId } from 'app/lmem/contributor';
import fetchNoticesSaga from 'app/store/sagas/fetchNotices.saga';

function* retrieveContributorSaga(contributorId: ContributorId) {
  let contributor = yield select(getContributorById(contributorId));
  if (!contributor) {
    yield take(UPDATE_CONTRIBUTORS);
    contributor = yield select(getContributorById(contributorId));
  }
  return contributor;
}

function* fetchContributorNoticesSaga({
  payload: contributorId
}: FetchContributorNoticesAction) {
  const contributor = yield call(retrieveContributorSaga, contributorId);
  yield put(fetchNoticesRequest(Object.values(contributor.noticesUrls)));
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
