import { put } from 'redux-saga/effects';
import waitForConnectionSaga from './waitForConnection.saga';
import {
  fetchSubscriptions,
  fetchSubscriptionsFailure
} from 'app/actions/subscriptions';
import { extensionMessageSender } from 'app/profiles/extensionId';

export default function* fetchSubscriptionsSaga() {
  try {
    yield waitForConnectionSaga();
    yield put(fetchSubscriptions({ receiver: extensionMessageSender }));
  } catch (error) {
    yield put(fetchSubscriptionsFailure(error));
  }
}
