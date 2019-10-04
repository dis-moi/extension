import { SagaIterator } from 'redux-saga';
import { takeLatest, all, put } from 'redux-saga/effects';
import { subscribe, SetupAction } from 'app/actions';

export function* setupSaga({
  payload: { subscriptions }
}: SetupAction): SagaIterator {
  yield all(subscriptions.map(id => put(subscribe(id))));
}

export default function*() {
  yield takeLatest('SETUP', setupSaga);
}
