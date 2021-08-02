import { put } from 'redux-saga/effects';
import fetchRestrictedContexts from 'libs/api/fetchRestrictedContexts';
import { updateRestrictedContexts } from 'libs/store/actions';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';

export function* fetchRestrictedContextsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 60
  });
  const restrictedContexts = yield callAndRetry(fetchRestrictedContexts);

  if (restrictedContexts) {
    yield put(updateRestrictedContexts(restrictedContexts));
  }
}
