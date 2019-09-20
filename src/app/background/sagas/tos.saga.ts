import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put } from 'redux-saga/effects';
import { tosAccepted } from '../../actions';
import { getOptionsTab } from '../selectors/tabs';

export function* acceptTosSaga(): SagaIterator {
  const optionsTab = yield select(getOptionsTab);
  if (optionsTab) {
    yield put(tosAccepted({ sendToTab: true, tab: optionsTab }));
  }
}

export default function*() {
  yield takeLatest('ACCEPT_TOS', acceptTosSaga);
}
