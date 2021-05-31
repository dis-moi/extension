import React from 'react';
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  delay
} from 'redux-saga/effects';
import { render } from 'react-dom';
import { go, replace } from 'connected-react-router';
import { StatefulNotice } from 'libs/lmem/notice';
import Logger from 'libs/utils/Logger';
import {
  close,
  closed,
  closeFailed,
  noticeDisplayed,
  open,
  opened,
  openFailed,
  OpenFrom,
  OpenAction,
  TOGGLE_UI,
  OPENED,
  CLOSE,
  OPEN,
  NOTICES_FOUND,
  ToggleUIAction,
  CloseAction
} from 'libs/store/actions';
import { CloseCause } from 'libs/lmem/ui';
import {
  getNoticesToDisplay,
  getPathname,
  hasUnreadNotices,
  isMounted as isNotificationMounted,
  isOpen as isNotificationOpen
} from '../../selectors';
import { append, create, hide, show } from '../../extensionIframe';
import theme from '../../../theme';
import App from '../../App';
import { history } from '../../store';
import { LOADED } from '../../actions/ui/open.actions';
import { fakeLoadingSaga } from './fakeLoading.saga';

const iframe = create(theme.iframe.style);
let contentDocument: Document;

export function* openSaga({ payload: openedFrom }: OpenAction) {
  try {
    const isOpen = yield select(isNotificationOpen);
    const isMounted = yield select(isNotificationMounted);

    const location = yield select(getPathname);
    if (location) {
      if (location !== '/notices') {
        yield put(replace('/'));
      }
    }

    if (!isOpen) {
      if (
        isMounted &&
        contentDocument &&
        contentDocument.visibilityState === 'visible'
      ) {
        Logger.trace('UI already mounted, showing it !');
        show();
      } else {
        Logger.trace('Mounting UI !');
        contentDocument = yield call(append, iframe);
        const root = contentDocument.createElement('div');
        contentDocument.body.appendChild(root);
        const renderAppInIframe = () =>
          render(<App contentDocument={contentDocument} />, root);
        yield call(renderAppInIframe);
      }

      yield put(opened(openedFrom));
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
    yield put(open(OpenFrom.UnreadNotices));
  }
}

export function* toggleUISaga({ payload: { closeCause } }: ToggleUIAction) {
  const isOpen = yield select(isNotificationOpen);
  if (isOpen) {
    yield put(close(closeCause));
  } else {
    yield put(
      open(CloseCause.BrowserAction ? OpenFrom.BrowserAction : OpenFrom.Unknown)
    );
  }
}

export function* loadedSaga() {
  const noticesToDisplay = yield select(getNoticesToDisplay);
  yield delay(100);
  yield all(
    noticesToDisplay.map(({ id }: StatefulNotice) => put(noticeDisplayed(id)))
  );
}

export default function* UISaga() {
  yield takeLatest(OPEN, openSaga);
  yield takeLatest(CLOSE, closeSaga);
  yield takeEvery(TOGGLE_UI, toggleUISaga);
  yield takeLatest(NOTICES_FOUND, noticesFoundSaga);
  yield takeLatest(OPENED, fakeLoadingSaga);
  yield takeLatest(LOADED, loadedSaga);
}
