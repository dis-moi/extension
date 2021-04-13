import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { BaseAction, ErrorAction } from '../actions';
import { Level } from '../utils/Logger';
import {
  captureException,
  captureMessage,
  severityToSentry
} from 'app/utils/sentry';

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
