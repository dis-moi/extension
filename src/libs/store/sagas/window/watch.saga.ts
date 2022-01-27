import { PuttableChannel, TakeableChannel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import { disconnected } from 'libs/store/actions/connection';
import { StandardAction } from 'libs/store/types';
import Logger from 'libs/utils/Logger';
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
  Logger.info('Initiating watchSaga …');

  const windowActionChannel = yield call(
    createActionChannel,
    window,
    targetOrigin,
    (action: StandardAction) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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
