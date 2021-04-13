import { SagaIterator } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
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
