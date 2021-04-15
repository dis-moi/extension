import { SagaIterator } from 'redux-saga';
import { takeLatest, select, put } from 'redux-saga/effects';
import { ACCEPT_TOS, tosAccepted } from '../../../../../../libs/store/actions';
import { getOptionsTabs } from '../selectors/tabs';

export function* acceptTosSaga(): SagaIterator {
  for (const optionsTab of yield select(getOptionsTabs)) {
    yield put(tosAccepted({ sendToTab: true, tab: optionsTab }));
  }
}

export default function*() {
  yield takeLatest(ACCEPT_TOS, acceptTosSaga);
}
