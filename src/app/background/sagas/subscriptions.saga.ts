import { all, fork, call, put, select, takeLatest } from 'redux-saga/effects';
import { STARTUP, subscribe, SUBSCRIBE, UNSUBSCRIBE } from 'app/actions';
import {
  getNbSubscriptions,
  getSubscriptions
} from 'app/background/selectors/subscriptions.selectors';
import postSubscriptions from 'api/postSubscriptions';
import { loginSaga } from './user.saga';
import { createCallAndRetry } from '../../sagas/effects/callAndRetry';
import { preselectedContributorIds } from 'app/lmemContributors';

function* postSubscriptionsSaga() {
  const extensionId = yield call(loginSaga);
  const subscriptions = yield select(getSubscriptions);

  const callAndRetry = createCallAndRetry({
    maximumAttempts: 10
  });

  yield callAndRetry(postSubscriptions, { extensionId, subscriptions });
}

export function* autoSubscribeSaga() {
  const nbSubscriptions = yield select(getNbSubscriptions);
  if (nbSubscriptions === 0) {
    yield all(
      preselectedContributorIds.map(contributorId =>
        put(subscribe(contributorId))
      )
    );
  }
}

export default function*() {
  yield fork(autoSubscribeSaga);
  yield takeLatest([SUBSCRIBE, UNSUBSCRIBE, STARTUP], postSubscriptionsSaga);
}
