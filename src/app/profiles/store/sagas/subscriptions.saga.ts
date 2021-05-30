import { put } from 'redux-saga/effects';
import {
  fetchSubscriptions,
  fetchSubscriptionsFailure
} from 'libs/store/actions/subscriptions';
import { extensionMessageSender } from 'app/profiles/extensionId';
import waitForConnectionSaga from './waitForConnection.saga';

export default function* fetchSubscriptionsSaga() {
  try {
    yield waitForConnectionSaga();
    yield put(fetchSubscriptions({ receiver: extensionMessageSender }));
  } catch (error) {
    yield put(fetchSubscriptionsFailure(error));
  }
}
