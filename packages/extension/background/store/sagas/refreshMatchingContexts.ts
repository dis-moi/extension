import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed,
  SUBSCRIBE,
  SubscribeAction,
} from 'libs/store/actions';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import { getSubscriptions } from 'app/background/store/selectors/subscriptions.selectors';
import { ContributorId } from '@dismoi/domain/contributor';
import fetchMatchingContexts from 'libs/api/fetchMatchingContexts';
import createAlarmChannel from 'libs/webext/alarmChannel';

const ALARM_NAME = 'refresh-matching-contexts';
const intervalMinutes = Number(process.env.REFRESH_MC_INTERVAL);

const callAndRetry = createCallAndRetry({
  maximumRetryDelayInMinutes: 10,
  onError: function* (error: Error) {
    yield put(refreshMatchingContextsFailed(error));
  },
});

export function* fetchMatchingContextsForContributor(
  contributorId: ContributorId,
) {
  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    contributorId,
  );
  if (matchingContexts) {
    yield put(receivedMatchingContexts(contributorId, matchingContexts));
  }
}

function* refreshAllMatchingContexts() {
  const subscriptions: ReturnType<typeof getSubscriptions> =
    yield select(getSubscriptions);

  for (const subscription of subscriptions) {
    yield fetchMatchingContextsForContributor(subscription);
  }
}

function* refreshMatchingContextsPeriodically() {
  yield call(refreshAllMatchingContexts);

  if (intervalMinutes > 0) {
    browser.alarms.create(ALARM_NAME, { periodInMinutes: intervalMinutes });
    const channel = createAlarmChannel(ALARM_NAME);
    while (true) {
      yield take(channel);
      yield call(refreshAllMatchingContexts);
    }
  }
}

function* fetchNewlySubscribedMatchingContexts(
  subscribeAction: SubscribeAction,
) {
  yield fetchMatchingContextsForContributor(subscribeAction.payload);
}

export default function* refreshMatchingContextsRootSaga() {
  yield call(refreshMatchingContextsPeriodically);
  yield takeEvery(SUBSCRIBE, fetchNewlySubscribedMatchingContexts);
}
