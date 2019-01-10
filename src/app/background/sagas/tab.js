import {
  put, takeLatest, select, call, fork, all
} from 'redux-saga/effects';
import { findTriggeredContexts } from '../selectors';
import {
  getInitialContent,
  getRecommendationsToDisplay, getDismissedRecommendations
} from '../selectors/prefs';
import {TAB_CREATED, TAB_UPDATED} from '../../constants/browser/tabs';
import {CONTEXT_TRIGGERED, MATCH_CONTEXT} from '../../constants/ActionTypes';
import {
  init, contextTriggered, matchContext, recoDismissed, recoDisplayed
} from '../actions/tabs';
import { recommendationFound } from '../../content/actions/recommendations';
import fetchMatchingRecommendations from '../../lmem/getMatchingRecommendations';
import { fetchContentScript, executeTabScript, sendToTab } from '../services';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';

export function* tabSaga({ payload: tab, meta: { url } }) {
  yield put(matchContext(url, tab));
}

export function* matchContextSaga({ payload: context, meta: { tab } }) {
  try {
    const triggeredContexts = yield select(state => findTriggeredContexts(state)(context));

    if (triggeredContexts.length >= 1) {
      yield put(contextTriggered(triggeredContexts, { trigger: context, tab }));
    }
  } catch (e) {
    console.error(e);
  }
}

export const contextTriggeredSaga = executeContentScript => function* ({
  payload: { triggeredContexts },
  meta: { tab, url }
}) {
  yield call(executeContentScript, tab);

  const initialContent = yield select(getInitialContent);

  yield put(init(initialContent, tab));

  const recommendations = yield call(fetchMatchingRecommendations, triggeredContexts.map(tc => tc.recommendation_url));
  console.log('recommendations', recommendations);
  const recommendationsToDisplay = yield select(getRecommendationsToDisplay(recommendations));
  yield all(recommendations.map(reco => put(recoDisplayed(reco, { trigger: url }))));

  const dismissedRecommendations = yield select(getDismissedRecommendations(recommendations));
  yield all(dismissedRecommendations.map(reco => put(recoDismissed(reco, { trigger: url }))));

  console.log('recommendationsToDisplay', recommendationsToDisplay);
  if (recommendationsToDisplay.length >= 1) {
    yield put(recommendationFound(recommendationsToDisplay, tab));
  }
};

export function* publishToTabSaga(action) {
  const { meta: { tab } } = action;
  const response = yield call(sendToTab, tab, action);

  console.log(`Tab "${tab}" respond`, response);
}

export default function* tabRootSaga() {
  yield fork(watchSingleMessageSaga);
  const contentCode = yield call(fetchContentScript, '/js/content.bundle.js');
  const executeTabContentScript = yield call(executeTabScript, contentCode);

  yield takeLatest([TAB_CREATED, TAB_UPDATED], tabSaga);
  yield takeLatest(MATCH_CONTEXT, matchContextSaga);
  yield takeLatest(CONTEXT_TRIGGERED, contextTriggeredSaga(executeTabContentScript));
  yield takeLatest(({ meta }) => meta && meta.tab, publishToTabSaga);
}
