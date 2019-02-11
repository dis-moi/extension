import {
  put, takeLatest, select, call, fork, all, take
} from 'redux-saga/effects';
import { findTriggeredContexts } from '../selectors';
import {
  getInitialContent,
  getRecommendationsToDisplay, getDismissedRecommendations
} from '../selectors/prefs';
import { TAB_CREATED, TAB_UPDATED } from '../../constants/browser/tabs';
import { CONTEXT_TRIGGERED, MATCH_CONTEXT } from '../../constants/ActionTypes';
import {
  init, contextTriggered, matchContext, matchContextFailure, recoDismissed, recoDisplayed, contextTriggerFailure
} from '../actions/tabs';
import { noticesFound } from '../../content/actions/recommendations';
import fetchMatchingRecommendations from '../../lmem/getMatchingRecommendations';
import {fetchContentScript, executeTabScript, sendToTab, createBrowserActionChannel} from '../services';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';

export function* tabSaga({ payload: tab, meta: { url } }) {
  yield put(matchContext(url, tab));
}

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

export const contextTriggeredSaga = executeContentScript => function* ({
  payload: { triggeredContexts },
  meta: { tab, url: trigger }
}) {
  try {
    yield call(executeContentScript, tab);

    const initialContent = yield select(getInitialContent);

    yield put(init(initialContent, tab));

    const recommendations = yield call(
      fetchMatchingRecommendations,
      triggeredContexts.map(tc => tc.recommendation_url)
    );

    const recommendationsToDisplay = yield select(getRecommendationsToDisplay(recommendations));
    yield all(recommendationsToDisplay.map(reco => put(recoDisplayed(reco, { trigger }))));

    const dismissedRecommendations = yield select(getDismissedRecommendations(recommendations));
    yield all(dismissedRecommendations.map(reco => put(recoDismissed(reco, { trigger }))));

    if (recommendationsToDisplay.length > 0) {
      yield put(noticesFound(recommendationsToDisplay, tab));
    } else {
      throw new Error('Context was triggered but they were no recommendations left to display.');
    }
  } catch (e) {
    yield put(contextTriggerFailure(e, { tab, trigger }));;
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

  yield takeLatest([TAB_CREATED, TAB_UPDATED], tabSaga);
  yield takeLatest(MATCH_CONTEXT, matchContextSaga);
  yield takeLatest(CONTEXT_TRIGGERED, contextTriggeredSaga(executeTabContentScript));
  yield takeLatest(({ meta }) => meta && meta.tab, publishToTabSaga);
}
