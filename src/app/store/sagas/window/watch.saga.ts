import { TakeableChannel, PuttableChannel } from 'redux-saga';
import { put, call, take, takeLatest } from 'redux-saga/effects';
import { disconnected } from 'app/store/actions/connection';
import { StandardAction } from 'app/store/types';
import createActionChannel from './createActionChannel';
import postActionSaga from './postAction.saga';

/**
 * @todo would love to see an implementation of this with `redux-saga` `stdChannel` or `multicastChannel`,
 * but didn't manage to get it working. Documentation is scarce on these aspects...
 * @see https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/UsingRunSaga.md
 */
function* watchSaga(
  window: Window,
  targetOrigin = '*',
  incomingChannel: PuttableChannel<StandardAction>,
  outgoingChannel: TakeableChannel<StandardAction>
) {
  const windowActionChannel = yield call(
    createActionChannel,
    window,
    targetOrigin,
    (action: StandardAction) =>
      !(typeof action.meta === 'object' && action.meta?.receiver?.id)
  );
  yield takeLatest(outgoingChannel, postActionSaga, window, targetOrigin);

  try {
    while (true) {
      const windowAction = yield take(windowActionChannel);
      yield put(incomingChannel, windowAction);
    }
  } catch (e) {
    yield put(disconnected(e));
  }
}

export default watchSaga;
