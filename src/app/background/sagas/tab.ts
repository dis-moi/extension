import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import * as R from 'ramda';
import { isToday } from 'date-fns';
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
  MatchContextAction,
  ReceivedNavigatedToUrlAction,
  TabAction
} from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import { Notice, StatefulNotice, warnIfNoticeInvalid } from 'app/lmem/notice';
import { fetchNotices } from 'api/fetchNotice';
import {
  areTosAccepted,
  getIgnoredNotices,
  getNoticesToDisplay
} from '../selectors/prefs';
import { findTriggeredContexts } from '../selectors';
import { getInstallationDetails } from '../selectors/installationDetails';
import { getServiceMessageLastShowDate } from '../selectors/serviceMessage.selectors';
import sendToTabSaga from './lib/sendToTab.saga';
import { isTabAuthorized } from '../selectors/resources';
import { disable } from 'webext/browserAction';
import { resetBadge } from 'app/lmem/badge';
import serviceMessageSaga from './serviceMessage.saga';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';

export function* tabSaga({ meta: { tab } }: ReceivedNavigatedToUrlAction) {
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
  meta: { tab },
  type
}: ContextTriggeredAction) {
  try {
    const installationDetails = yield select(getInstallationDetails);
    yield put(init(installationDetails, tab));

    const toFetch = R.compose<MatchingContext[], string[], string[]>(
      R.uniq,
      R.map(tc => tc.noticeUrl)
    )(triggeredContexts);

    const notices = yield call(fetchNotices, toFetch);
    yield put(noticesFetched(notices));
    const validNotices: Notice[] = notices.filter(warnIfNoticeInvalid);

    const noticesToShow: StatefulNotice[] = yield select(
      getNoticesToDisplay(validNotices)
    );

    if (noticesToShow.length > 0) {
      const tosAccepted = yield select(areTosAccepted);
      const nbSubscriptions = yield select(getNbSubscriptions);
      if (tosAccepted && nbSubscriptions > 0) {
        yield put(noticesFound(noticesToShow, tab));
        yield all(noticesToShow.map(({ id }) => put(noticeBadged(id, tab))));
      } else {
        const lastServiceMessageDate = yield select(
          getServiceMessageLastShowDate
        );
        if (!isToday(lastServiceMessageDate)) {
          yield call(serviceMessageSaga, {
            payload: triggeredContexts,
            meta: { tab },
            type
          });
        }
        return;
      }
    } else {
      yield put(noNoticesDisplayed(tab));
    }

    const ignoredNotices: StatefulNotice[] = yield select(
      getIgnoredNotices(validNotices)
    );
    yield all(
      ignoredNotices.map(notice => put(noticeIgnored(notice, tab.url)))
    );
  } catch (e) {
    yield put(contextTriggerFailure(e, tab));
  }
};

const shouldActionBeSentToTab = (action: AppAction) =>
  Boolean(action.meta && action.meta.sendToTab);
function* sendActionToTab(action: TabAction) {
  yield sendToTabSaga(action.meta.tab, action);
}

export default function* tabRootSaga() {
  yield takeEvery(NAVIGATED_TO_URL, tabSaga);
  yield takeEvery(MATCH_CONTEXT, matchContextSaga);
  yield takeEvery(CONTEXT_TRIGGERED, contextTriggeredSaga);
  yield takeEvery(shouldActionBeSentToTab, sendActionToTab);
}
