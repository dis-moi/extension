import { put, takeEvery, select, call, all, take } from 'redux-saga/effects';
import * as R from 'ramda';
import { isToday } from 'date-fns';
import { TAB_CREATED, TAB_UPDATED } from 'app/constants/browser/tabs';
import { CONTEXT_TRIGGERED, MATCH_CONTEXT } from 'app/constants/ActionTypes';
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
  MatchContextAction,
  ContextTriggeredAction,
  TabAction,
  TabCreatedAction,
  TabUpdatedAction,
  AppAction,
  showBullesUpdateMessage
} from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import Tab from 'app/lmem/tab';
import { StatefulNotice, Notice, warnIfNoticeInvalid } from 'app/lmem/notice';
import { fetchNotices } from 'api/fetchNotice';
import sendToTab from 'webext/sendActionToTab';
import executeTabScript, {
  ExecuteContentScript
} from 'webext/executeTabScript';
import fetchContentScript from '../../services/fetchContentScript';
import {
  getNoticesToDisplay,
  getIgnoredNotices,
  areTosAccepted
} from '../selectors/prefs.selectors';
import { findTriggeredContexts } from '../selectors';
import { getInstallationDetails } from '../selectors/installationDetails';
import { getTabs } from '../selectors/tabs';
import { getUpdateMessageLastShowDate } from '../selectors/bullesUpdate.selectors';

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
    const installationDetails = yield select(getInstallationDetails);
    yield put(init(installationDetails, tab));

    const toFetch = R.compose<MatchingContext[], string[], string[]>(
      R.uniq,
      R.map(tc => tc.noticeUrl)
    )(triggeredContexts);

    const notices = yield call(fetchNotices, toFetch);
    const validNotices: Notice[] = notices.filter(warnIfNoticeInvalid);

    const noticesToShow: StatefulNotice[] = yield select(getNoticesToDisplay, {
      notices: validNotices
    });

    if (noticesToShow.length > 0) {
      const tosAccepted = yield select(areTosAccepted);
      if (tosAccepted) {
        yield all(
          noticesToShow.map(notice => put(noticeDisplayed(notice, tab.url)))
        );
        yield put(noticesFound(noticesToShow, tab));
      } else {
        const lastUpdateMessageDate = yield select(
          getUpdateMessageLastShowDate
        );
        if (!isToday(lastUpdateMessageDate)) {
          yield put(showBullesUpdateMessage(tab));
        }
        return;
      }
    } else {
      yield put(noNoticesDisplayed(tab));
    }

    const ignoredNotices: StatefulNotice[] = yield select(getIgnoredNotices, {
      notices: validNotices
    });
    yield all(
      ignoredNotices.map(notice => put(noticeIgnored(notice, tab.url)))
    );
  } catch (e) {
    yield put(contextTriggerFailure(e, tab));
  }
};

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

export function* sendToTabSaga(action: TabAction) {
  const tab = action.meta.tab;
  const tabs: { [id: string]: Tab } = yield select(getTabs);
  if (!tabs[tab.id]) return;
  if (!tabs[tab.id].ready) {
    yield waitForTabReadySaga(tab);
  }
  sendToTab(tab.id, action);
}

const shouldActionBeSentToTab = (action: AppAction) =>
  Boolean(action.meta && action.meta.sendToTab);

export default function* tabRootSaga() {
  const contentCode: string = yield call(
    fetchContentScript,
    '/js/content.bundle.js'
  );
  const executeTabContentScript = yield call(executeTabScript, contentCode);

  yield takeEvery([TAB_CREATED, TAB_UPDATED], tabSaga(executeTabContentScript));
  yield takeEvery(MATCH_CONTEXT, matchContextSaga);
  yield takeEvery(CONTEXT_TRIGGERED, contextTriggeredSaga);
  yield takeEvery(shouldActionBeSentToTab, sendToTabSaga);
}
