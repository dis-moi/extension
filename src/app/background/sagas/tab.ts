import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as R from 'ramda';
import {
  CONTEXT_TRIGGERED,
  MATCH_CONTEXT,
  NAVIGATED_TO_URL,
  init,
  contextNotTriggered,
  contextTriggered,
  contextTriggerFailure,
  matchContext,
  matchContextFailure,
  noNoticesDisplayed,
  noticeBadged,
  noticeIgnored,
  noticesFound,
  noticesFetched,
  AppAction,
  ContextTriggeredAction,
  ContextNotTriggeredAction,
  MatchContextAction,
  TabAction,
  CONTEXT_NOT_TRIGGERED,
  TAB_ACTIVATED,
  clearServiceMessage
} from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { MatchingContext } from 'app/lmem/matchingContext';
import {
  NoticeWithContributor,
  StatefulNoticeWithContributor,
  warnIfNoticeInvalid
} from 'app/lmem/notice';
import { fetchNoticesByUrls } from 'api/fetchNotice';
import {
  areTosAccepted,
  getIgnoredNotices,
  getNoticesToDisplay
} from '../selectors/prefs';
import { findTriggeredContexts } from '../selectors';
import { getInstallationDetails } from '../selectors/installationDetails';
import sendToTabSaga from './lib/sendToTab.saga';
import { isTabAuthorized } from '../selectors/resources';
import { disable } from 'webext/browserAction';
import { resetBadge } from 'app/lmem/badge';
import serviceMessageSaga from './serviceMessage.saga';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import { createCallAndRetry } from '../../sagas/effects/callAndRetry';
import { Level } from '../../utils/Logger';

export function* tabSaga({ meta: { tab } }: TabAction) {
  const tabAuthorized = yield select(isTabAuthorized(tab));
  if (tabAuthorized) {
    yield put(matchContext(tab));
  } else {
    yield call(disable, tab);
    yield call(resetBadge, tab.id);
  }
}

export function* matchContextSaga({ meta: { tab } }: MatchContextAction) {
  try {
    yield put(clearServiceMessage(tab));
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

    const tosAccepted = yield select(areTosAccepted);
    const nbSubscriptions = yield select(getNbSubscriptions);
    const toFetch = R.compose<MatchingContext[], string[], string[]>(
      R.uniq,
      R.map(tc => tc.noticeUrl)
    )(triggeredContexts);

    const callAndRetry = createCallAndRetry({ maximumAttempts: 5 });

    const notices: NoticeWithContributor[] | undefined = yield callAndRetry(
      fetchNoticesByUrls,
      toFetch
    );

    if (!notices) {
      yield put(
        contextTriggerFailure(new Error('Could not fetch notices'), tab)
      );
      return;
    }

    yield put(noticesFetched(notices));
    const validNotices: NoticeWithContributor[] = notices.filter(
      warnIfNoticeInvalid
    );

    // Break saga execution if the "installation is not complete".
    if (!tosAccepted || nbSubscriptions === 0) {
      yield call(serviceMessageSaga, tab, validNotices.length);

      return;
    } else {
      yield put(clearServiceMessage(tab));
    }

    const noticesToShow: StatefulNoticeWithContributor[] = yield select(
      getNoticesToDisplay(validNotices)
    );
    if (noticesToShow.length > 0) {
      yield put(noticesFound(noticesToShow, tab));
      yield all(noticesToShow.map(({ id }) => put(noticeBadged(id, tab))));
    } else {
      yield put(noNoticesDisplayed(tab));
    }

    const ignoredNotices: StatefulNoticeWithContributor[] = yield select(
      getIgnoredNotices(validNotices)
    );
    yield all(
      ignoredNotices.map(notice => put(noticeIgnored(notice, tab.url)))
    );
  } catch (e) {
    yield put(contextTriggerFailure(e, tab));
  }
};

export const contextNotTriggeredSaga = function*({
  meta: { tab }
}: ContextNotTriggeredAction) {
  try {
    const tosAccepted = yield select(areTosAccepted);
    const nbSubscriptions = yield select(getNbSubscriptions);
    // Break saga execution if the "installation is not complete".
    if (!tosAccepted || nbSubscriptions === 0) {
      yield call(serviceMessageSaga, tab, 0);

      return;
    }
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
};

const shouldActionBeSentToTab = (action: AppAction) =>
  Boolean(action.meta && action.meta.sendToTab);
function* sendActionToTab(action: TabAction) {
  yield sendToTabSaga(action.meta.tab, action);
}

export default function* tabRootSaga() {
  yield takeEvery(NAVIGATED_TO_URL, tabSaga);
  yield takeEvery(TAB_ACTIVATED, tabSaga);
  yield takeEvery(MATCH_CONTEXT, matchContextSaga);
  yield takeEvery(CONTEXT_TRIGGERED, contextTriggeredSaga);
  yield takeEvery(CONTEXT_NOT_TRIGGERED, contextNotTriggeredSaga);
  yield takeEvery(shouldActionBeSentToTab, sendActionToTab);
}
