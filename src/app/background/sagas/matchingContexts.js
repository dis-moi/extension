import {
  put, takeLatest, select, call
} from 'redux-saga/effects';
import { getSelectedCriteria, getExcludedEditors } from '../selectors/prefs';
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
  refreshMatchingContexts,
} from '../actions/kraftBackend';

export function* refreshMatchingContextsSaga() {
  const selectedCriteria = yield select(getSelectedCriteria);
  const excludedEditors = yield select(getExcludedEditors);
  const matchingContexts = yield call(fetchMatchingContexts, selectedCriteria, excludedEditors);

  yield put(receivedMatchingContexts(matchingContexts));
}

export function* scheduleRefreshAfterwardSaga() {
  yield put(refreshMatchingContexts());
}

export default function* tabRootSaga() {
  yield takeLatest(REFRESH_MATCHING_CONTEXTS, refreshMatchingContextsSaga);
  yield takeLatest(
    [
      EXCLUDE_EDITOR,
      INCLUDE_EDITOR,
      SELECT_CRITERION,
      UNSELECT_CRITERION
    ],
    scheduleRefreshAfterwardSaga
  );
}
