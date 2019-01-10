import { put, takeLatest, fork } from 'redux-saga/effects';
import fromJS from '../../utils/customFromJS';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';
import { INIT } from '../../constants/ActionTypes';
import { updateCriteria, updateEditors, updateInstalledDetails } from '../actions/filters';

export function* initSaga({ payload: { onInstalledDetails, criteria, editors } }) {
  try {
    yield put(updateInstalledDetails(fromJS(onInstalledDetails)));
    yield put(updateCriteria(fromJS(criteria)));
    yield put(updateEditors(fromJS(editors)));
  } catch (e) {
    console.error(e);
  }
}

export default function* backgroundRootSaga() {
  yield fork(watchSingleMessageSaga);

  yield takeLatest(INIT, initSaga);
}
