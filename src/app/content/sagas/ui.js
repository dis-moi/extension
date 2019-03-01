import React from 'react';
import {
  put, takeLatest, select, call
} from 'redux-saga/effects';
import { render } from 'react-dom';
import { goBack } from 'connected-react-router';
import { open, opened, closed } from '../actions/ui';
import { isOpen as isNotificationOpen, isMounted as isNotificationMounted} from '../selectors';
import { CLOSE, OPEN, NOTICES_FOUND } from '../../constants/ActionTypes';
import { append, create } from '../extensionIframe';
import theme from '../../theme';
import App from '../App';

const iframe = create({
  style: theme.iframe.style,
});

const getLocation = state => state.getIn(['router', 'location', 'pathname']);

export function* openSaga() {
  const isOpen = yield select(isNotificationOpen);
  const isMounted = yield select(isNotificationMounted);

  if (!isOpen) {
    const location = yield select(getLocation);
    if (location && /\/notices\/details\/[0-9]+/.test(location)) {
      yield put(goBack());
    }

    if (isMounted) {
      document.querySelector('#lmemFrame').style.setProperty('display', '', 'important');
    } else {
      const contentDocument = yield call(append, iframe);
      const root = document.createElement('div');
      contentDocument.body.appendChild(root);
      yield call(render, <App contentDocument={contentDocument} />, root);
    }

    yield put(opened());
  }
}

export function* closeSaga() {
  const isOpen = yield select(isNotificationOpen);
  if (isOpen) {
    document.querySelector('#lmemFrame').style.setProperty('display', 'none', 'important');
    yield put(closed());
  }
}

export function* recommendationFoundSaga() {
  yield put(open());
}

export default function* backgroundRootSaga() {
  yield takeLatest(OPEN, openSaga);
  yield takeLatest(CLOSE, closeSaga);
  yield takeLatest(NOTICES_FOUND, recommendationFoundSaga);
}
