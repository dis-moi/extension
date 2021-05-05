import { SagaIterator } from '@redux-saga/types';
import { put, select } from '@redux-saga/core/effects';
import { getUserId } from '../selectors/user';
import { login } from '../../../../../libs/store/actions/user';
import uniqId from '../../../../../libs/utils/uniqId';

export function* loginSaga(): SagaIterator {
  let userId = yield select(getUserId);

  if (!userId) {
    yield put(login(uniqId()));
    userId = yield select(getUserId);
  }

  return userId;
}
