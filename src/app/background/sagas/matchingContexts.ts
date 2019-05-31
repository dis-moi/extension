import { put, takeLatest, call } from 'redux-saga/effects';
import fetchMatchingContexts from '../../../api/fetchMatchingContexts';
import { REFRESH_MATCHING_CONTEXTS } from '../../constants/ActionTypes';

import { receivedMatchingContexts } from 'app/actions/kraftBackend';

export function* refreshMatchingContextsSaga() {
  const matchingContexts = yield call(fetchMatchingContexts);

  yield put(receivedMatchingContexts(matchingContexts));
}

export default function* tabRootSaga() {
  yield takeLatest(REFRESH_MATCHING_CONTEXTS, refreshMatchingContextsSaga);
}
