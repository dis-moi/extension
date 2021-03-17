import { put } from 'redux-saga/effects';
import fetchRestrictedContexts from 'api/fetchRestrictedContexts';
import { updateRestrictedContexts } from 'app/actions';
import { createCallAndRetry } from 'app/sagas/effects/callAndRetry';
import { RestrictedContext } from '../../lmem/matchingContext';

export function* fetchRestrictedContextsSaga() {
  const callAndRetry = createCallAndRetry({
    maximumRetryDelayInMinutes: 60
  });
  const restrictedContexts: RestrictedContext[] = yield callAndRetry(
    fetchRestrictedContexts
  );

  if (restrictedContexts) {
    yield put(updateRestrictedContexts(restrictedContexts));
  }
}
