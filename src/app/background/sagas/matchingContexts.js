import { put, takeLatest, call } from 'redux-saga/effects';
import {
  REFRESH_MATCHING_CONTEXTS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  SELECT_CRITERION,
  UNSELECT_CRITERION
} from '../../constants/ActionTypes';

import {
  fetchMatchingContexts,
  receivedMatchingContexts,
  refreshMatchingContexts
} from 'app/actions/kraftBackend';

export function* refreshMatchingContextsSaga() {
  const matchingContexts = yield call(fetchMatchingContexts);

  yield put(receivedMatchingContexts(matchingContexts));
}

export function* scheduleRefreshAfterwardSaga() {
  yield put(refreshMatchingContexts());
}

export default function* tabRootSaga() {
  yield takeLatest(REFRESH_MATCHING_CONTEXTS, refreshMatchingContextsSaga);
  yield takeLatest(
    [EXCLUDE_EDITOR, INCLUDE_EDITOR, SELECT_CRITERION, UNSELECT_CRITERION],
    scheduleRefreshAfterwardSaga
  );
}
