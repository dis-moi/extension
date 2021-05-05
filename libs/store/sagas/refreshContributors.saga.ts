import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import { put } from 'redux-saga/effects';
import {
  receivedContributors,
  refreshContributorsFailed
} from 'libs/store/actions';
import fetchContributors from '../../../apps/background/src/api/fetchContributors';

export default function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 120,
    maximumAttempts: 6,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    yield put(receivedContributors(contributors));
  }
}
