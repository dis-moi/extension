import { takeLatest } from 'redux-saga/effects';
import { REFRESH_MATCHING_CONTEXTS } from 'app/actions';
import refreshMatchingContextsSaga from 'app/store/sagas/refreshMatchingContexts.saga';

export default function* matchingContextsRootSaga() {
  yield takeLatest(REFRESH_MATCHING_CONTEXTS, refreshMatchingContextsSaga);
}
