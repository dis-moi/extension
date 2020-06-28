import {
  receivedMatchingContexts,
  RefreshMatchingContextsAction,
  refreshMatchingContextsFailed
} from 'app/actions';
import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { put } from 'redux-saga/effects';
import fetchMatchingContexts from 'api/fetchMatchingContexts';

export default function* refreshMatchingContextsSaga({
  payload: { contributors }
}: RefreshMatchingContextsAction) {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 10,
    maximumAttempts: 10,
    onError: function*(error: Error) {
      yield put(refreshMatchingContextsFailed(error));
    }
  });
  const matchingContexts = yield callAndRetry(
    fetchMatchingContexts,
    contributors
  );

  if (matchingContexts) {
    yield put(receivedMatchingContexts(matchingContexts));
  }
}
