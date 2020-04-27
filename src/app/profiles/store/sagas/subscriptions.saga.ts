import { put } from 'redux-saga/effects';
import {
  fetchSubscriptions,
  fetchSubscriptionsFailure
} from 'app/actions/subscriptions';
import createMessageSender from 'app/profiles/createMessageSender';
import extensionId from 'app/profiles/extensionId';
import { waitForConnectionSaga } from './connection.saga';

export default function* fetchSubscriptionsSaga() {
  try {
    yield waitForConnectionSaga;
    yield put(
      fetchSubscriptions({ receiver: createMessageSender({ id: extensionId }) })
    );
  } catch (error) {
    yield put(fetchSubscriptionsFailure(error));
  }
}
