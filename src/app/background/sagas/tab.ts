import { put, takeEvery, select, call, all } from 'redux-saga/effects';
import * as R from 'ramda';
import { isToday } from 'date-fns';
import { CONTEXT_TRIGGERED, MATCH_CONTEXT } from 'app/constants/ActionTypes';
import {
  init,
  contextTriggered,
  matchContext,
  matchContextFailure,
  noticeIgnored,
  contextTriggerFailure,
  contextNotTriggered,
  noNoticesDisplayed,
  noticesFound,
  showBullesUpdateMessage,
  noticeBadged,
  NAVIGATED_TO_URL,
  AppAction,
  MatchContextAction,
  TabAction,
  ContextTriggeredAction,
  ReceivedNavigatedToUrlAction
} from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import { StatefulNotice, Notice, warnIfNoticeInvalid } from 'app/lmem/notice';
import { fetchNotices } from 'api/fetchNotice';
import {
  getNoticesToDisplay,
  getIgnoredNotices,
  areTosAccepted
} from '../selectors/prefs';
import { findTriggeredContexts } from '../selectors';
import { getInstallationDetails } from '../selectors/installationDetails';
import { getUpdateMessageLastShowDate } from '../selectors/bullesUpdate.selectors';
import sendToTabSaga from './lib/sendToTab.saga';
import isAuthorizedTab from '../../../webext/isAuthorizedTab';

export function* tabSaga({ meta: { tab } }: ReceivedNavigatedToUrlAction) {
  if (isAuthorizedTab(tab)) {
    yield put(matchContext(tab));
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

    const noticesToShow: StatefulNotice[] = yield select(
      getNoticesToDisplay(validNotices)
    );

    if (noticesToShow.length > 0) {
      const tosAccepted = yield select(areTosAccepted);
      if (tosAccepted) {
        yield all(noticesToShow.map(({ id }) => put(noticeBadged(id, tab))));
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
