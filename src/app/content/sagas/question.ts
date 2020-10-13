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
import createQuestionEmail from 'app/background/services/createQuestionEmail';
import { history } from '../store';

export function* submitQuestionSaga({
  payload: question,
  meta: { form, resolve, reject }
}: SubmitQuestionAction) {
  try {
    yield call(sendEmail, createQuestionEmail(question));

    yield put(questionSubmitted(question));

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
