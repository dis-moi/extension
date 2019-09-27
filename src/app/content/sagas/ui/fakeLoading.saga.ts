import { delay, put } from '@redux-saga/core/effects';
import { endLoading } from '../../actions/ui/open.actions';

const DELAY_BEFORE_SHOWING = process.env.NODE_ENV === 'production' ? 4000 : 10;

export function* fakeLoadingSaga() {
  yield delay(DELAY_BEFORE_SHOWING);
  yield put(endLoading());
}
