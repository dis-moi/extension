import { eventChannel } from 'redux-saga';
import {
  put,
  takeLatest,
  select,
  call,
  fork,
  all,
  take
} from 'redux-saga/effects';
import * as R from 'ramda';
import { TAB_CREATED, TAB_UPDATED } from 'app/constants/browser/tabs';
import {
  CONTEXT_TRIGGERED,
  MATCH_CONTEXT,
  NOTICES_FOUND
} from 'app/constants/ActionTypes';
import {
  init,
  contextTriggered,
  matchContext,
  matchContextFailure,
  noticeIgnored,
  noticeDisplayed,
  contextTriggerFailure,
  contextNotTriggered,
  noNoticesDisplayed,
  noticesFound,
  noticesUpdated,
  createErrorAction,
  MatchContextAction,
  ContextTriggeredAction,
  NoticesFoundAction,
  BaseAction,
  TabAction,
  TabCreatedAction,
  TabUpdatedAction,
  AppAction
} from 'app/actions';
import fetchContentScript from '../services/fetchContentScript';
import { MatchingContext } from 'app/lmem/matchingContext';
import { StatefulNotice, Notice, warnIfNoticeInvalid } from 'app/lmem/notice';
import { fetchNotices } from 'api/fetchNotice';
import listenActionsFromMessages from 'app/sagas/listenActionsFromMessages';
import createBrowserActionListener from 'webext/createBrowserActionListener';
import sendToTab from 'webext/sendActionToTab';
import executeTabScript, {
  ExecuteContentScript
} from 'webext/executeTabScript';
import {
  getInitialContent,
  getNoticesToDisplay,
  getIgnoredNotices
} from '../selectors/prefs';
import { findTriggeredContexts } from '../selectors';
import { getTabs } from '../selectors/tabs';
import Tab from '../../lmem/Tab';

export const tabSaga = (executeContentScript: ExecuteContentScript) =>
  function*({ payload: { tab } }: TabCreatedAction | TabUpdatedAction) {
    yield call(executeContentScript, tab);
    yield put(matchContext(tab));
  };

export function* matchContextSaga({ meta: { tab } }: MatchContextAction) {
  try {
    const triggeredContexts = yield select(state =>
      findTriggeredContexts(state)(tab.url)
    );

    if (triggeredContexts.length >= 1) {
      yield put(contextTriggered(triggeredContexts, tab));
    } else {
      yield put(contextNotTriggered(triggeredContexts, tab));
    }
  } catch (e) {
    yield put(matchContextFailure(e, tab));
  }
}

export const contextTriggeredSaga = function*({
  payload: triggeredContexts,
  meta: { tab }
}: ContextTriggeredAction) {
  try {
    const initialContent = yield select(getInitialContent);
    yield put(init(initialContent.installationDetails, tab));

    const toFetch = R.compose<MatchingContext[], string[], string[]>(
      R.uniq,
      R.map(tc => tc.noticeUrl)
    )(triggeredContexts);

    const notices = yield call(fetchNotices, toFetch);
    const validNotices: Notice[] = notices.filter(warnIfNoticeInvalid);

    const noticesToShow: StatefulNotice[] = yield select(
      getNoticesToDisplay(validNotices)
    );
    yield all(
      noticesToShow.map(notice => put(noticeDisplayed(notice, tab.url)))
    );

    const ignoredNotices: StatefulNotice[] = yield select(
      getIgnoredNotices(validNotices)
    );
    yield all(
      ignoredNotices.map(notice => put(noticeIgnored(notice, tab.url)))
    );

    if (noticesToShow.length > 0) {
      yield put(noticesFound(noticesToShow, tab));
    } else {
      yield put(noNoticesDisplayed(tab));
    }
  } catch (e) {
    yield put(contextTriggerFailure(e, tab));
  }
};

const waitForTabReadySaga = (tab: Tab) =>
  function*() {
    yield take((readyAction: AppAction) =>
      Boolean(
        readyAction.type === 'LISTENING_ACTIONS_READY' &&
          readyAction.meta.tab &&
          readyAction.meta.tab.id === tab.id
      )
    );
  };

export function* publishToTabSaga(action: TabAction) {
  const tab = action.meta.tab;
  const tabs: { [id: string]: Tab } = yield select(getTabs);
  if (!tabs[tab.id].ready) {
    yield take((readyAction: AppAction) =>
      Boolean(
        readyAction.type === 'LISTENING_ACTIONS_READY' &&
          readyAction.meta.tab!.id === tab.id
      )
    );
  }
  sendToTab(tab.id, action);
}

export function* watchBrowserActionSaga() {
  const channel = yield call(() => eventChannel(createBrowserActionListener));

  while (true) {
    try {
      yield put(yield take(channel));
    } catch (e) {
      createErrorAction()(e);
    }
  }
}

export function* updateNoticesSaga({
  payload: { notices },
  meta: { tab }
}: NoticesFoundAction) {
  yield put(noticesUpdated(notices, { tab }));
}

export default function* tabRootSaga() {
  yield fork(listenActionsFromMessages('background'));
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
    (action: BaseAction) => Boolean(action.meta && action.meta.sendToTab),
    publishToTabSaga
  );

  yield takeLatest(NOTICES_FOUND, updateNoticesSaga);
}
