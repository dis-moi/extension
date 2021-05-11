import { delay, put, select, takeEvery, fork } from 'redux-saga/effects';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed,
  SUBSCRIBE,
  SubscribeAction
} from 'app/actions';
import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { getSubscriptions } from 'app/background/selectors/subscriptions.selectors';
import minutesToMilliseconds from 'app/utils/minutesToMilliseconds';
import { ContributorId } from 'app/lmem/contributor';
import fetchMatchingContexts from 'api/fetchMatchingContexts';

const refreshInterval = minutesToMilliseconds(
  Number(process.env.REFRESH_MC_INTERVAL)
);

if (refreshInterval > 0) {
  // eslint-disable-next-line no-console
  console.info(
    `Matching contexts will be refreshed every ${process.env.REFRESH_MC_INTERVAL} minutes.`
  );
} else {
  // eslint-disable-next-line no-console
  console.warn(
    'Matching contexts auto-refresh disabled:',
    'assuming "process.env.REFRESH_MC_INTERVAL" is deliberately not defined.'
  );
}

const callAndRetry = createCallAndRetry({
  maximumRetryDelayInMinutes: 10,
  onError: function*(error: Error) {
    yield put(refreshMatchingContextsFailed(error));
  }
});

export function* fetchMatchingContextsForContributor(
  contributorId: ContributorId
) {
  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    contributorId
  );
  if (matchingContexts) {
    yield put(receivedMatchingContexts(contributorId, matchingContexts));
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore To be typed properly
export function* refreshMatchingContextsPeriodically() {
  const subscriptions: ReturnType<typeof getSubscriptions> = yield select(
    getSubscriptions
  );

  for (const subscription of subscriptions) {
    yield fetchMatchingContextsForContributor(subscription);
  }

  if (refreshInterval > 0) {
    yield delay(refreshInterval);
    yield refreshMatchingContextsPeriodically();
  }
}

function* fetchNewlySubscribedMatchingContexts(
  subscribeAction: SubscribeAction
) {
  yield fetchMatchingContextsForContributor(subscribeAction.payload);
}

export default function* refreshMatchingContextsRootSaga() {
  yield fork(refreshMatchingContextsPeriodically);
  yield takeEvery(SUBSCRIBE, fetchNewlySubscribedMatchingContexts);
}
