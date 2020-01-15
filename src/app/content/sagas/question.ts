import { put, takeLatest, call } from 'redux-saga/effects';
import { go, replace } from 'connected-react-router';
import { reset } from 'redux-form';
import {
  questionSubmissionFailed,
  questionSubmitted,
  SUBMIT_QUESTION,
  SubmitQuestionAction
} from '../../actions/question';
import { createSubmissionError } from 'app/utils/form';
import sendEmail from 'api/sendInBlue/sendEmail';
import createContributionEmail from 'app/background/services/createContributionEmail';
import { history } from '../store';

export function* submitQuestionSaga({
  payload: contribution,
  meta: { form, resolve, reject }
}: SubmitQuestionAction) {
  try {
    yield call(sendEmail, createContributionEmail(contribution));

    yield put(questionSubmitted(contribution));

    if (form) {
      // reset history, form and redirect to success page
      yield put(go(-history.entries.length));
      yield put(replace('/question/confirmation'));

      yield put(reset(form));

      yield call(resolve);
    }
  } catch (e) {
    yield put(questionSubmissionFailed(e));

    if (form) {
      yield call(reject, createSubmissionError(e));
    }
  }
}

export default function*() {
  yield takeLatest(SUBMIT_QUESTION, submitQuestionSaga);
}
