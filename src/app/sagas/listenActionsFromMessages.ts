import { call, put, take } from '@redux-saga/core/effects';
import { eventChannel } from 'redux-saga';
import { listenActionFailed, listeningActionsReady } from '../actions';
import createActionsListener from 'webext/createActionsListener';
import { From } from 'webext/From';

const createActionsListenerChannel = () => eventChannel(createActionsListener);

const listenActionsFromMessages = (from: From) =>
  function*() {
    const listenedActionsChannel = yield call(createActionsListenerChannel);

    yield put(
      listeningActionsReady(from, {
        sendToBackground: from === 'content' || from === 'options'
      })
    );

    while (true) {
      try {
        yield put(yield take(listenedActionsChannel));
      } catch (e) {
        put(listenActionFailed(e));
      }
    }
  };

export default listenActionsFromMessages;
