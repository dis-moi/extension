import React from 'react';
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import { createRoot, Root } from 'react-dom/client';
import { go, replace } from 'libs/store/router';
import { StatefulNotice } from '@dismoi/domain/notice';
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
  CloseAction,
} from 'libs/store/actions';
import { CloseCause } from '@dismoi/domain/ui';
import { append, create, hide, show } from 'app/content/extensionIframe';
import { getTheme } from 'libs/facets/getTheme';
import App from 'app/content/App';
import { history } from 'app/content/store';
import {
  getNoticesToDisplay,
  getPathname,
  hasUnreadNotices,
  isMounted as isNotificationMounted,
  isOpen as isNotificationOpen,
} from '../../selectors';
import { LOADED } from '../../actions/ui/open.actions';
import { fakeLoadingSaga } from './fakeLoading.saga';

const theme = getTheme();
const iframe = create(theme.iframe.style);
let contentDocument: Document;
let root: Root | null = null;

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
        const rootElement = contentDocument.createElement('div');
        contentDocument.body.appendChild(rootElement);
        const renderAppInIframe = () => {
          root = createRoot(rootElement);
          root.render(<App contentDocument={contentDocument} />);
        };
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
      open(
        CloseCause.BrowserAction ? OpenFrom.BrowserAction : OpenFrom.Unknown,
      ),
    );
  }
}

export function* loadedSaga() {
  const noticesToDisplay = yield select(getNoticesToDisplay);
  yield delay(100);
  yield all(
    noticesToDisplay.map(({ id }: StatefulNotice) => put(noticeDisplayed(id))),
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
