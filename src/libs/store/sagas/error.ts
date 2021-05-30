import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  captureException,
  captureMessage,
  severityToSentry
} from 'libs/utils/sentry';
import { Level } from 'libs/utils/Logger';
import { BaseAction, ErrorAction } from '../actions';

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
