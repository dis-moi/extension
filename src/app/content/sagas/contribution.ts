import { put, race, take, takeLatest, call } from 'redux-saga/effects';
import { go, replace } from 'connected-react-router';
import { reset } from 'redux-form';
import { history } from '../store';
import {
  CONTRIBUTION_SUBMISSION_FAILED,
  CONTRIBUTION_SUBMITTED,
  SUBMIT_CONTRIBUTION,
  SubmitContributionAction
} from 'app/actions/contribution';
import { createSubmissionError } from 'app/utils/form';

export function* submitContributionSaga({
  meta: { form, resolve, reject }
}: SubmitContributionAction) {
  try {
    const { contributionSubmittedAction } = yield race({
      contributionSubmittedAction: take(CONTRIBUTION_SUBMITTED),
      contributionSubmissionFailedAction: take(CONTRIBUTION_SUBMISSION_FAILED)
    });

    if (form) {
      if (contributionSubmittedAction) {
        // reset history, form and redirect to success page
        yield put(go(-history.entries.length));
        yield put(replace('/contribute/submitted'));

        yield put(reset(form));

        yield call(resolve);
      } else {
        // @todo we should be able to extract the error from `contributionSubmissionFailedAction`
        // but the error is lost somewhere along the way,
        // when reaching the content script it's just an empty object :(
        yield call(
          reject,
          createSubmissionError(new Error("Quelque chose s'est mal passé :("))
        );
      }
    }
  } catch (e) {
    if (form) {
      yield call(reject, createSubmissionError(e));
    }
  }
}

export default function*() {
  yield takeLatest(SUBMIT_CONTRIBUTION, submitContributionSaga);
}
