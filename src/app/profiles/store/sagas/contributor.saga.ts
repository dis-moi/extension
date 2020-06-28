import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchContributorFailure,
  fetchContributorSuccess,
  FetchContributorRequestAction,
  FETCH_CONTRIBUTOR_REQUEST
} from 'app/actions/contributor';
import fetchContributor from 'api/fetchContributor';

function* fetchContributorSaga({
  payload: contributorId
}: FetchContributorRequestAction) {
  try {
    const contributor = yield call(fetchContributor, contributorId);
    yield put(fetchContributorSuccess(contributor));
  } catch (e) {
    yield put(fetchContributorFailure(e));
  }
}

export default function* contributorSaga() {
  yield takeLatest(FETCH_CONTRIBUTOR_REQUEST, fetchContributorSaga);
}
