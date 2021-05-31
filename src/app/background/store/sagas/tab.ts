import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as R from 'ramda';
import i18n from 'i18next';
import {
  AppActionWithMeta,
  clearServiceMessage,
  CONTEXT_NOT_TRIGGERED,
  CONTEXT_TRIGGERED,
  contextNotTriggered,
  ContextNotTriggeredAction,
  contextTriggered,
  ContextTriggeredAction,
  contextTriggerFailure,
  init,
  MATCH_CONTEXT,
  matchContext,
  MatchContextAction,
  matchContextFailure,
  NAVIGATED_TO_URL,
  noNoticesDisplayed,
  noticeBadged,
  noticeIgnored,
  noticesFetched,
  noticesFound,
  TAB_ACTIVATED,
  TabAction
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import {
  filterContextsMatchingTabContent,
  MatchingContext
} from 'libs/lmem/matchingContext';
import {
  NoticeWithContributor,
  StatefulNoticeWithContributor,
  warnIfNoticeInvalid
} from 'libs/lmem/notice';
import { fetchNoticesByUrls } from 'libs/api/fetchNotice';
import { disable } from 'libs/webext/browserAction';
import { resetBadge } from 'libs/lmem/badge';
import Tab from 'libs/lmem/tab';
import { createCallAndRetry } from 'libs/store/sagas/effects/callAndRetry';
import { Level } from 'libs/utils/Logger';
import {
  areTosAccepted,
  getIgnoredNotices,
  getNoticesToDisplay
} from 'app/background/store/selectors/prefs';
import { getContextsMatchingUrl } from 'app/background/store/selectors';
import { getInstallationDetails } from 'app/background/store/selectors/installationDetails';
import { isTabAuthorized } from 'app/background/store/selectors/resources';
import { getNbSubscriptions } from 'app/background/store/selectors/subscriptions.selectors';
import serviceMessageSaga from './serviceMessage.saga';
import sendToTabSaga from './lib/sendToTab.saga';

export const getExtensionTitle = () =>
  `Dismoi ${
    process.env.NODE_ENV !== 'production' ? `- ${process.env.NODE_ENV}` : ''
  }`;

export function* restrictTabSaga(tab: Tab) {
  yield call(disable, tab);
  yield call(browser.browserAction.setTitle, {
    tabId: tab.id,
    title: `${getExtensionTitle()} - ` + i18n.t('tab.disabled')
  });
  yield call(resetBadge, tab.id);
}

export function* tabSaga({ meta: { tab } }: TabAction) {
  try {
    const tabAuthorized = yield select(isTabAuthorized(tab));
    if (tabAuthorized) {
      yield put(matchContext(tab));
    } else {
      yield call(restrictTabSaga, tab);
    }
  } catch (e) {
    yield put(createErrorAction()(e));
  }
}

export function* matchContextSaga({ meta: { tab } }: MatchContextAction) {
  try {
    yield put(clearServiceMessage(tab));
    const contextsMatchingUrl = yield select(state =>
      getContextsMatchingUrl(state)(tab.url)
    );

    if (contextsMatchingUrl.length >= 1) {
      const contextsMatchingContent = yield call(
        filterContextsMatchingTabContent,
        tab,
        contextsMatchingUrl
      );

      yield put(contextTriggered(contextsMatchingContent, tab));
    } else {
      yield put(contextNotTriggered(contextsMatchingUrl, tab));
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

const shouldActionBeSentToTab = (action: AppActionWithMeta) =>
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
