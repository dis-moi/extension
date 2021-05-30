import { SagaIterator } from 'redux-saga';
import { put, select } from '@redux-saga/core/effects';
import { login } from 'libs/store/actions/user';
import uniqId from 'libs/utils/uniqId';
import { getUserId } from '../selectors/user';

export function* loginSaga(): SagaIterator {
  let userId = yield select(getUserId);

  if (!userId) {
    yield put(login(uniqId()));
    userId = yield select(getUserId);
  }

  return userId;
}
