import { put } from 'redux-saga/effects';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import {
  receivedContributors,
  refreshContributorsFailed
} from 'libs/store/actions';
import fetchContributors from 'libs/api/fetchContributors';

export default function* refreshContributorsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    onError: function*(error: Error) {
      yield put(refreshContributorsFailed(error));
    }
  });
  const contributors = yield callAndRetry(fetchContributors);

  if (contributors) {
    yield put(receivedContributors(contributors));
  }
}
