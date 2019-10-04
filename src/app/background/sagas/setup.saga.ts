import { SagaIterator } from 'redux-saga';
import { takeLatest, all, put } from 'redux-saga/effects';
import { SetupAction, setupCompleted } from 'app/actions/install';
import { subscribe } from '../../actions';

export function* setupSaga({
  payload: { subscriptions },
  meta: { tab }
}: SetupAction): SagaIterator {
  yield all(subscriptions.map(id => put(subscribe(id))));

  yield put(setupCompleted(tab));
}

export default function*() {
  yield takeLatest('SETUP', setupSaga);
}
