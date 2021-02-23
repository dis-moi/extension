import { put, takeLatest, call } from 'redux-saga/effects';
import {
  contributionSubmissionFailed,
  contributionSubmitted,
  SUBMIT_CONTRIBUTION,
  SubmitContributionAction
} from 'app/actions/contribution';
import postContribution from 'api/postContribution';

export function* submitContributionSaga({
  payload: contribution,
  meta: { tab }
}: SubmitContributionAction) {
  try {
    yield call(postContribution, contribution);
    yield put(contributionSubmitted(contribution, { tab }));
  } catch (e) {
    yield put(contributionSubmissionFailed(e, { tab }));
  }
}

export default function*() {
  yield takeLatest(SUBMIT_CONTRIBUTION, submitContributionSaga);
}
