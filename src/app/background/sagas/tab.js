import {
  put, takeLatest, select, call, fork, all, take
} from 'redux-saga/effects';
import { findTriggeredContexts } from '../selectors';
import { getInitialContent, getNoticesToDisplay, getIgnoredNotices } from '../selectors/prefs';
import { TAB_CREATED, TAB_UPDATED } from '../../constants/browser/tabs';
import { CONTEXT_TRIGGERED, MATCH_CONTEXT } from '../../constants/ActionTypes';
import {
  init, contextTriggered, matchContext, matchContextFailure, noticeIgnored, noticeDisplayed, contextTriggerFailure
} from '../actions/tabs';
import { noticesFound } from '../../content/actions/recommendations';
import fetchMatchingRecommendations from '../../lmem/getMatchingRecommendations';
import {
  fetchContentScript, executeTabScript, sendToTab, createBrowserActionChannel
} from '../services';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';

export const tabSaga = executeContentScript => function* ({ payload: tab, meta: { url } }) {
  yield call(executeContentScript, tab, url);
  yield put(matchContext(url, tab));
};

export function* matchContextSaga({ payload: trigger, meta: { tab } }) {
  try {
    const triggeredContexts = yield select(state => findTriggeredContexts(state)(trigger));

    if (triggeredContexts.length >= 1) {
      yield put(contextTriggered(triggeredContexts, { trigger, tab }));
    } else {
      throw new Error('No contexts triggered');
    }
  } catch (e) {
    yield put(matchContextFailure(e, { trigger, tab }));
  }
}

export const contextTriggeredSaga = function* ({
  payload: { triggeredContexts },
  meta: { tab, url: trigger }
}) {
  try {
    const initialContent = yield select(getInitialContent);

    yield put(init(initialContent, tab));

    const notices = yield call(
      fetchMatchingRecommendations,
      triggeredContexts.map(tc => tc.recommendation_url)
    );

    const noticesToShow = yield select(getNoticesToDisplay(notices));
    yield all(noticesToShow.map(notice => put(noticeDisplayed(notice, trigger))));

    const ignoredNotices = yield select(getIgnoredNotices(notices));
    yield all(ignoredNotices.map(notice => put(noticeIgnored(notice, trigger))));

    if (noticesToShow.length > 0) {
      yield put(noticesFound(noticesToShow, tab));
    } else {
      // Will throw here when we will be able to not trigger context on dismissed/disliked notices
      // throw new Error('Context was triggered but they were no recommendations left to display.');
    }
  } catch (e) {
    yield put(contextTriggerFailure(e, { tab, trigger }));
  }
};

export function* publishToTabSaga(action) {
  const { meta: { tab } } = action;
  const response = yield call(sendToTab, tab, action);

  console.log(`Tab "${tab}" respond`, response);
}

export function* watchBrowserActionSaga() {
  const channel = yield call(createBrowserActionChannel);

  while (true) {
    try {
      const action = yield take(channel);
      console.log(action);
      yield put(action);
    } catch (e) {
      console.error(e);
    }
  }
}

export default function* tabRootSaga() {
  yield fork(watchSingleMessageSaga);
  yield fork(watchBrowserActionSaga);
  const contentCode = yield call(fetchContentScript, '/js/content.bundle.js');
  const executeTabContentScript = yield call(executeTabScript, contentCode);

  yield takeLatest([TAB_CREATED, TAB_UPDATED], tabSaga(executeTabContentScript));
  yield takeLatest(MATCH_CONTEXT, matchContextSaga);
  yield takeLatest(CONTEXT_TRIGGERED, contextTriggeredSaga);
  yield takeLatest(({ meta }) => meta && meta.tab, publishToTabSaga);
}
