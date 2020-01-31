import { SagaIterator } from 'redux-saga';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { createErrorAction, SUBSCRIBE, UNSUBSCRIBE } from 'app/actions';
import { getUserId } from 'app/background/selectors/user';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import postSubscriptions from 'api/postSubscriptions';

function* postSubscriptionsSaga(): SagaIterator {
  try {
    const extensionId = yield select(getUserId);
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
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE], postSubscriptionsSaga);
}
