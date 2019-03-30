import {
  put,
  takeLatest,
  select,
  call,
  fork,
  all,
  take
} from 'redux-saga/effects';
import { findTriggeredContexts } from '../selectors';
import {
  getInitialContent,
  getNoticesToDisplay,
  getIgnoredNotices
} from '../selectors/prefs';
import { TAB_CREATED, TAB_UPDATED } from '../../constants/browser/tabs';
import { CONTEXT_TRIGGERED, MATCH_CONTEXT } from '../../constants/ActionTypes';
import {
  init,
  contextTriggered,
  matchContext,
  matchContextFailure,
  noticeIgnored,
  noticeDisplayed,
  contextTriggerFailure,
  MatchContextAction,
  ContextTriggeredAction
} from 'app/actions/tabs';
import { noticesFound } from 'app/actions/recommendations';
import watchSingleMessageSaga from '../../utils/watchSingleMessageSaga';
import { TabAction } from '../../actions';
import fetchContentScript from '../services/fetchContentScript';
import executeTabScript, {
  ExecuteContentScript
} from '../services/executeTabScript';
import createBrowserActionChannel from '../services/createBrowserActionChannel';
import {
  TabCreatedAction,
  TabUpdatedAction
} from '../../actions/tabsLifecycle';
import * as R from 'ramda';
import { MatchingContext } from '../../lmem/matchingContext';
import { EnhancedNotice } from '../../lmem/notice';
import sendToTab from '../services/sendToTab';
import { AppAction } from '../../actions/';
import { fetchMatchingNotices } from '../../lmem/fetchMatchingNotices';

export const tabSaga = (executeContentScript: ExecuteContentScript) =>
  function*({ payload: { tab, url } }: TabCreatedAction | TabUpdatedAction) {
    yield call(executeContentScript, tab, url);
    yield put(matchContext(url, tab));
  };

export function* matchContextSaga({
  payload: { url },
  meta: { tab }
}: MatchContextAction) {
  try {
    const triggeredContexts = yield select(state =>
      findTriggeredContexts(state)(url)
    );

    if (triggeredContexts.length >= 1) {
      yield put(contextTriggered(tab, url, triggeredContexts));
    } else {
      throw new Error('No contexts triggered');
    }
  } catch (e) {
    yield put(matchContextFailure(e, url, tab));
  }
}

export const contextTriggeredSaga = function*({
  payload: { tab, url: trigger, triggeredContexts }
}: ContextTriggeredAction) {
  try {
    const initialContent = yield select(getInitialContent);
    yield put(init(tab, initialContent.installationDetails));

    const toFetch = R.compose<MatchingContext[], string[], string[]>(
      R.uniq,
      R.map(tc => tc.recommendation_url)
    )(triggeredContexts);

    const notices = yield call(fetchMatchingNotices, toFetch);

    const noticesToShow: EnhancedNotice[] = yield select(
      getNoticesToDisplay(notices)
    );
    yield all(
      noticesToShow.map(notice => put(noticeDisplayed(notice, trigger)))
    );

    const ignoredNotices: EnhancedNotice[] = yield select(
      getIgnoredNotices(notices)
    );
    yield all(
      ignoredNotices.map(notice => put(noticeIgnored(notice, trigger)))
    );

    if (noticesToShow.length > 0) {
      yield put(noticesFound(noticesToShow, tab));
    } else {
      // Will throw here when we will be able to not trigger context on dismissed/disliked notices
      // throw new Error('Context was triggered but they were no recommendations left to display.');
    }
  } catch (e) {
    yield put(contextTriggerFailure(tab, trigger, e));
  }
};

export function* publishToTabSaga(action: TabAction) {
  const {
    meta: { tab }
  } = action;
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
  const contentCode: string = yield call(
    fetchContentScript,
    '/js/content.bundle.js'
  );
  const executeTabContentScript = yield call(executeTabScript, contentCode);

  yield takeLatest(
    [TAB_CREATED, TAB_UPDATED],
    tabSaga(executeTabContentScript)
  );
  yield takeLatest(MATCH_CONTEXT, matchContextSaga);
  yield takeLatest(CONTEXT_TRIGGERED, contextTriggeredSaga);
  yield takeLatest(
    (action: AppAction) => Boolean(action.meta && action.meta.sendToTab),
    publishToTabSaga
  );
}
