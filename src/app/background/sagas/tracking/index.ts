import { SagaIterator } from '@redux-saga/types';
import { call, takeEvery, takeLatest } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import { AppAction, createErrorAction } from 'app/actions';
import {
  CLOSE,
  NOTICES_FOUND,
  SUBSCRIBE,
  UNSUBSCRIBE
} from 'app/constants/ActionTypes';
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

        yield takeLatest('INSTALLATION_DETAILS', trackInstallSaga(tracker));

        yield takeEvery([NOTICES_FOUND], startTrackingSaga(tracker));
        yield takeLatest(
          (action: AppAction) =>
            action.type === 'LOCATION_CHANGED' &&
            action.payload.location.pathname !== '/',
          trackLocationChangeSaga(tracker)
        );
        yield takeEvery(
          'BROWSER/BROWSER_ACTION_CLICKED',
          trackBrowserActionClickedSaga(tracker)
        );
        yield takeEvery('NOTICE/BADGED', trackNoticeBadgedSaga(tracker));
        yield takeEvery('NOTICE/DISPLAYED', trackNoticeDisplayedSaga(tracker));
        yield takeEvery('NOTICE/UNFOLDED', trackNoticeUnfoldedSaga(tracker));
        yield takeLatest(
          isFeedBackRatingAction,
          trackNoticeFeedbackSaga(tracker)
        );
        yield takeLatest(
          'NOTICE/OUTBOUND_LINK_CLICKED',
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
