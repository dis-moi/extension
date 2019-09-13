import React from 'react';
import { put, takeLatest, takeEvery, select, call } from 'redux-saga/effects';
import { render } from 'react-dom';
import { go, replace } from 'connected-react-router';
import {
  open,
  opened,
  openFailed,
  closed,
  closeFailed,
  CloseAction,
  SWITCH_UI,
  SwitchUIAction,
  SHOW_BULLES_UPDATE_SERVICE_MESSAGE,
  close
} from 'app/actions';
import { CLOSE, OPEN, NOTICES_FOUND } from 'app/constants/ActionTypes';
import {
  isOpen as isNotificationOpen,
  isMounted as isNotificationMounted,
  getPathname,
  hasUnreadNotices
} from '../selectors';
import { append, create, hide, show } from '../extensionIframe';
import theme from '../../theme';
import App from '../App';
import { history } from '../store';

const iframe = create(theme.iframe.style);
let contentDocument: Document;

export function* openSaga() {
  try {
    const isOpen = yield select(isNotificationOpen);
    const isMounted = yield select(isNotificationMounted);

    if (!isOpen) {
      const location = yield select(getPathname);
      if (location) {
        yield put(replace('/'));
      }

      if (isMounted && contentDocument.visibilityState === 'visible') {
        show();
      } else {
        contentDocument = yield call(append, iframe);
        const root = document.createElement('div');
        contentDocument.body.appendChild(root);
        const renderAppInIframe = () =>
          render(<App contentDocument={contentDocument} />, root);
        yield call(renderAppInIframe);
      }

      yield put(opened());
    }
  } catch (e) {
    yield put(openFailed(e));
  }
}

export function* closeSaga(closeAction: CloseAction) {
  try {
    const isOpen = yield select(isNotificationOpen);
    if (isOpen) {
      hide();
      yield put(go(-history.entries.length));
      yield put(closed(closeAction.payload.cause));
    }
  } catch (e) {
    yield put(closeFailed(e));
  }
}

export function* noticesFoundSaga() {
  const shouldOpen = yield select(hasUnreadNotices);
  if (shouldOpen) {
    yield put(open());
  }
}

export function* switchUISaga(action: SwitchUIAction) {
  const isOpen = yield select(isNotificationOpen);
  yield put(isOpen ? close(action.payload.closeCause) : open());
}

export default function* backgroundRootSaga() {
  yield takeLatest(OPEN, openSaga);
  yield takeLatest(CLOSE, closeSaga);
  yield takeEvery(
    [SWITCH_UI, SHOW_BULLES_UPDATE_SERVICE_MESSAGE],
    switchUISaga
  );
  yield takeLatest(NOTICES_FOUND, noticesFoundSaga);
}
