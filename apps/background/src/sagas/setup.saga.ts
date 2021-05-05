import { SagaIterator } from 'redux-saga';
import { takeLatest, all, put } from 'redux-saga/effects';
import { SETUP, SetupAction } from 'libs/store/actions/install';
import { subscribe } from '../../../../libs/store/actions';

export function* setupSaga({
  payload: { subscriptions }
}: SetupAction): SagaIterator {
  yield all(subscriptions.map(id => put(subscribe(id))));
}

export default function*() {
  yield takeLatest(SETUP, setupSaga);
}
