import React from "react";
import { put, takeLatest, select, call } from "redux-saga/effects";
import { render } from "react-dom";
import { push } from "connected-react-router";
import { open, opened, closed } from "app/actions/ui";
import {
  isOpen as isNotificationOpen,
  isMounted as isNotificationMounted
} from "../selectors";
import { CLOSE, OPEN, NOTICES_FOUND } from "../../constants/ActionTypes";
import { append, create } from "../extensionIframe";
import theme from "../../theme";
import App from "../App";
import { State } from "../store";

const iframe = create(theme.iframe.style);

const getLocation = (state: State) => state.router.location.pathname;

const setFrameImportant = () => {
  const frame = document.querySelector("#lmemFrame");
  if (frame) {
    (frame as HTMLIFrameElement).style.setProperty("display", "", "important");
  }
};

export function* openSaga() {
  const isOpen = yield select(isNotificationOpen);
  const isMounted = yield select(isNotificationMounted);

  if (!isOpen) {
    const location = yield select(getLocation);
    if (location) {
      yield put(push("/"));
    }

    if (isMounted) {
      setFrameImportant();
    } else {
      const contentDocument = yield call(append, iframe);
      const root = document.createElement("div");
      contentDocument.body.appendChild(root);
      const show = () =>
        render(<App contentDocument={contentDocument} />, root);
      yield call(show);
    }

    yield put(opened());
  }
}

export function* closeSaga() {
  const isOpen = yield select(isNotificationOpen);
  if (isOpen) {
    setFrameImportant();
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
