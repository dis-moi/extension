import { delay, put } from '@redux-saga/core/effects';
import { OpenedAction, OpenFrom } from 'libs/store/actions';
import { loaded } from 'app/content/store/actions/ui/open.actions';

const DELAY_BEFORE_SHOWING = process.env.NODE_ENV === 'production' ? 1100 : 110;

export function* fakeLoadingSaga({ payload: openedFrom }: OpenedAction) {
  if (openedFrom !== OpenFrom.BrowserAction) {
    yield delay(DELAY_BEFORE_SHOWING);
  }
  yield put(loaded());
}
