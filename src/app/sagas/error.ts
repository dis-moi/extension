import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { captureException } from 'app/utils/sentry';
import { BaseAction, ErrorAction } from '../actions';

export function* handleErrorSaga({
  payload: error
}: ErrorAction): SagaIterator {
  captureException(error);
}

export default function* errorRootSaga() {
  yield takeLatest(
    (action: BaseAction) => action.error === true,
    handleErrorSaga
  );
}
