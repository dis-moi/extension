import { SagaIterator } from 'redux-saga';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import {
  createErrorAction,
  STARTUP,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/actions';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import postSubscriptions from 'api/postSubscriptions';
import { loginSaga } from './user.saga';

function* postSubscriptionsSaga(): SagaIterator {
  try {
    const extensionId = yield call(loginSaga);
    const subscriptions = yield select(getSubscriptions);

    yield call(postSubscriptions, {
      extensionId,
      subscriptions
    });
  } catch (e) {
    yield put(createErrorAction()(e));
  }
}

export default function*() {
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE, STARTUP], postSubscriptionsSaga);
}
