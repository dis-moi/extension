import { put, call } from 'redux-saga/effects';
import fetchRestrictedContexts from 'api/fetchRestrictedContexts';
import { updateRestrictedContexts } from 'app/actions';
import { regressiveRetry } from 'app/sagas/effects/regressiveRetry';

export function* fetchRestrictedContextsSaga() {
  const restrictedContexts = yield call(
    regressiveRetry,
    {
      maximumRetryDelayInMinutes: 60
    },
    fetchRestrictedContexts
  );

  if (restrictedContexts) {
    yield put(updateRestrictedContexts(restrictedContexts));
  }
}
