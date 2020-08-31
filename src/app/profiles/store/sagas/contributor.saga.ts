import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchContributorFailure,
  fetchContributorSuccess,
  FetchContributorRequestAction,
  FETCH_CONTRIBUTOR_REQUEST,
  FETCH_CONTRIBUTOR_SUCCESS,
  FetchContributorSuccessAction
} from 'app/actions/contributor';
import fetchContributor from 'api/fetchContributor';
import { fetchNoticesRequest } from '../../../actions';

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

function* fetchContributorFeaturedNoticeSaga({
  payload: {
    contribution: {
      example: { noticeUrl }
    }
  }
}: FetchContributorSuccessAction) {
  yield put(fetchNoticesRequest({ url: noticeUrl }));
}

export default function* contributorSaga() {
  yield takeLatest(FETCH_CONTRIBUTOR_REQUEST, fetchContributorSaga);
  yield takeLatest(
    FETCH_CONTRIBUTOR_SUCCESS,
    fetchContributorFeaturedNoticeSaga
  );
}
