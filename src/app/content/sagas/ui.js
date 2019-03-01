import React from 'react';
import {
  put, takeLatest, select, call
} from 'redux-saga/effects';
import { render } from 'react-dom';
import { goBack } from 'connected-react-router';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { Provider} from 'react-redux';
import { open, opened, closed } from '../actions/ui';
import { isOpen as isNotificationOpen } from '../selectors';
import {CLOSE, OPEN, NOTICES_FOUND} from '../../constants/ActionTypes';
import { append, create, remove } from '../extensionIframe';
import theme from '../../theme';
import store from '../store';
import App from '../App';

const iframe = create({
  style: theme.iframe.style,
});

const getLocation = state => state.getIn(['router', 'location', 'pathname']);

export function* openSaga() {
  const isOpen = yield select(isNotificationOpen);

  if (!isOpen) {
    const location = yield select(getLocation);
    if (location && /\/notices\/details\/[0-9]+/.test(location)) {
      yield put(goBack());
    }

    const contentDocument = yield call(append, iframe);

    const root = document.createElement('div');
    contentDocument.body.appendChild(root);

    yield call(
      render,
      <StyleSheetManager target={contentDocument.head}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </StyleSheetManager>,
      root
    );

    yield put(opened());
  }
}

export function* closeSaga() {
  const isOpen = yield select(isNotificationOpen);
  if (isOpen) {
    yield call(remove);
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
