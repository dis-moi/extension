import { put, takeLatest, call } from 'redux-saga/effects';
import fetchMatchingContexts from 'api/lmem/fetchMatchingContexts';
import { REFRESH_MATCHING_CONTEXTS } from '../../constants/ActionTypes';
import {
  receivedMatchingContexts,
  refreshMatchingContextsFailed
} from 'app/actions/kraftBackend';

export function* refreshMatchingContextsSaga() {
  try {
    const matchingContexts = yield call(fetchMatchingContexts);

    yield put(receivedMatchingContexts(matchingContexts));
  } catch (e) {
    yield put(refreshMatchingContextsFailed(e));
  }
}

export default function* tabRootSaga() {
  yield takeLatest(REFRESH_MATCHING_CONTEXTS, refreshMatchingContextsSaga);
}
