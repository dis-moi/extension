import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  ContributorAction,
  STARTUP,
  SUBSCRIBE,
  subscribed,
  subscribeFailed,
  UNSUBSCRIBE,
  unsubscribed,
  unsubscribedFailed
} from 'app/actions';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import postSubscriptions from 'api/postSubscriptions';
import { loginSaga } from './user.saga';
import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { SagaIterator } from 'redux-saga';
import {
  FETCH_SUBSCRIPTIONS,
  FetchSubscriptionsAction,
  fetchSubscriptionsFailure,
  fetchSubscriptionsSuccess
} from 'app/actions/subscriptions';

function* postSubscriptionsSaga() {
  const extensionId = yield call(loginSaga);
  const subscriptions = yield select(getSubscriptions);

  const callAndRetry = createCallAndRetry({
    maximumAttempts: 10
  });

  yield callAndRetry(postSubscriptions, { extensionId, subscriptions });
}

function* subscribeSaga({ payload: contributorId, meta }: ContributorAction) {
  try {
    yield call(postSubscriptionsSaga);
    yield put(subscribed(contributorId, { receiver: meta?.sender }));
  } catch (e) {
    yield put(subscribeFailed(e, { receiver: meta?.sender }));
  }
}

function* unsubscribeSaga({ payload: contributorId, meta }: ContributorAction) {
  try {
    yield call(postSubscriptionsSaga);
    yield put(unsubscribed(contributorId, { receiver: meta?.sender }));
  } catch (e) {
    yield put(unsubscribedFailed(e, { receiver: meta?.sender }));
  }
}

export function* fetchSubscriptionsSaga({
  meta
}: FetchSubscriptionsAction): SagaIterator {
  try {
    const subscriptions = yield select(getSubscriptions);

    yield put(
      fetchSubscriptionsSuccess(subscriptions, { receiver: meta?.sender })
    );
  } catch (e) {
    yield put(fetchSubscriptionsFailure(e, { receiver: meta?.sender }));
  }
}

export default function*() {
  yield takeLatest(STARTUP, postSubscriptionsSaga);
  yield takeLatest(SUBSCRIBE, subscribeSaga);
  yield takeLatest(UNSUBSCRIBE, unsubscribeSaga);
  yield takeLatest(FETCH_SUBSCRIPTIONS, fetchSubscriptionsSaga);
}
