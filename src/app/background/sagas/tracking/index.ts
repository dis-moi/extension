import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, takeLatest } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import {
  BROWSER_ACTION_CLICKED,
  CLOSE,
  INSTALLATION_DETAILS,
  LOCATION_CHANGED,
  NOTICE_BADGED,
  NOTICE_DISPLAYED,
  NOTICE_UNFOLDED,
  NOTICES_FOUND,
  OUTBOUND_LINK_CLICKED,
  SUBSCRIBE,
  UNSUBSCRIBE,
  createErrorAction,
  AppAction
} from 'app/actions';
import { isFeedBackRatingAction } from 'app/background/sagas/ratings/notices.saga';
import { loginSaga } from 'app/background/sagas/user.saga';
import { trackContributorActionSaga } from './trackContributor.saga';

import {
  startTrackingSaga,
  trackBrowserActionClickedSaga,
  trackCloseSaga,
  trackInstallSaga,
  trackLocationChangeSaga
} from './trackUI.saga';
import {
  trackNoticeBadgedSaga,
  trackNoticeDisplayedSaga,
  trackNoticeFeedbackSaga,
  trackNoticeOutboundClickSaga,
  trackNoticeUnfoldedSaga
} from './trackNotice.saga';

export default (tracker?: Tracker) =>
  function*(): SagaIterator {
    try {
      if (tracker) {
        tracker.userId = yield call(loginSaga);

        yield takeLatest(INSTALLATION_DETAILS, trackInstallSaga(tracker));

        yield takeEvery([NOTICES_FOUND], startTrackingSaga(tracker));
        yield takeLatest(
          (action: AppAction) =>
            action.type === LOCATION_CHANGED &&
            action.payload.location.pathname !== '/',
          trackLocationChangeSaga(tracker)
        );
        yield takeEvery(
          BROWSER_ACTION_CLICKED,
          trackBrowserActionClickedSaga(tracker)
        );
        yield takeEvery(NOTICE_BADGED, trackNoticeBadgedSaga(tracker));
        yield takeEvery(NOTICE_DISPLAYED, trackNoticeDisplayedSaga(tracker));
        yield takeEvery(NOTICE_UNFOLDED, trackNoticeUnfoldedSaga(tracker));
        yield takeLatest(
          isFeedBackRatingAction,
          trackNoticeFeedbackSaga(tracker)
        );
        yield takeLatest(
          OUTBOUND_LINK_CLICKED,
          trackNoticeOutboundClickSaga(tracker)
        );

        yield takeEvery(
          [SUBSCRIBE, UNSUBSCRIBE],
          trackContributorActionSaga(tracker)
        );

        yield takeLatest(CLOSE, trackCloseSaga(tracker));
      }
    } catch (e) {
      createErrorAction()(e);
    }
  };
