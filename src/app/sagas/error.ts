import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  captureException,
  captureMessage,
  severityToSentry
} from 'app/utils/sentry';
import { BaseAction, ErrorAction } from '../actions';
import { Level } from '../utils/Logger';

export function* handleErrorSaga({
  type,
  payload: error,
  meta: { severity }
}: ErrorAction): SagaIterator {
  if (severity >= Level.ERROR) {
    captureException(error);
  } else {
    captureMessage(error?.message || type, severityToSentry[severity]);
  }
}

export default function* errorRootSaga() {
  yield takeLatest(
    (action: BaseAction) => action.error === true,
    handleErrorSaga
  );
}
