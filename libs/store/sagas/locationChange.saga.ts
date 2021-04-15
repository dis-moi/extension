import { SagaIterator } from '@redux-saga/types';
import { put, takeEvery } from '@redux-saga/core/effects';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { locationChanged } from '../actions';

export function* trackLocationChangeSaga(
  action: LocationChangeAction
): SagaIterator {
  yield put(locationChanged(action));
}

export default function* locationChangeRootSaga() {
  yield takeEvery([LOCATION_CHANGE], trackLocationChangeSaga);
}
