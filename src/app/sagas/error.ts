import { takeLatest } from 'redux-saga/effects';
import { BaseAction, ErrorAction } from '../actions';

export function* handleErrorSaga({
  payload: e
}: ErrorAction): IterableIterator<any> {
  console.error(e);
}

export default function* errorRootSaga() {
  yield takeLatest(
    (action: BaseAction) => action.error === true,
    handleErrorSaga
  );
}
