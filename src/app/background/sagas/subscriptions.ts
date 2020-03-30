import { call, select, takeLatest } from 'redux-saga/effects';
import { STARTUP, SUBSCRIBE, UNSUBSCRIBE } from 'app/actions';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import postSubscriptions from 'api/postSubscriptions';
import { loginSaga } from './user.saga';
import { createCallAndRetry } from '../../sagas/effects/callAndRetry';

function* postSubscriptionsSaga() {
  const extensionId = yield call(loginSaga);
  const subscriptions = yield select(getSubscriptions);

  const callAndRetry = createCallAndRetry({
    maximumAttempts: 10
  });

  yield callAndRetry(postSubscriptions, { extensionId, subscriptions });
}

export default function*() {
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE, STARTUP], postSubscriptionsSaga);
}
