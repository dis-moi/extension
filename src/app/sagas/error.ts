import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { captureException } from '@sentry/browser';
import { BaseAction, ErrorAction } from '../actions';

export function* handleErrorSaga({
  payload: e
}: ErrorAction): SagaIterator {
  if (process.env.SENTRY_ENABLE) {
    captureException(e);
  } else {
    console.error(e);
  }
}

export default function* errorRootSaga() {
  yield takeLatest(
    (action: BaseAction) => action.error === true,
    handleErrorSaga
  );
}
