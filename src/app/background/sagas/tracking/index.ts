import { SagaIterator } from '@redux-saga/types';
import { call, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
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
  TOS_ACCEPTED,
  AppAction,
  TosAcceptedAction
} from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { isFeedBackRatingAction } from 'app/background/sagas/ratings/notices.saga';
import { loginSaga } from 'app/background/sagas/user.saga';
import { trackContributorActionSaga } from './trackContributor.saga';

import {
  startTrackingSaga,
  trackBrowserActionClickedSaga,
  trackCloseSaga,
  trackInstallSaga,
  trackLocationChangeSaga,
  trackTosAcceptedSaga
} from './trackUI.saga';
import {
  trackNoticeBadgedSaga,
  trackNoticeDisplayedSaga,
  trackNoticeFeedbackSaga,
  trackNoticeOutboundClickSaga,
  trackNoticeUnfoldedSaga
} from './trackNotice.saga';
import { areTosAccepted } from '../../selectors/prefs';
import { Level } from '../../../utils/Logger';

export default (tracker?: Tracker) =>
  function*(): SagaIterator {
    try {
      if (tracker) {
        tracker.userId = yield call(loginSaga);
        tracker.tosAccepted = yield select(areTosAccepted);

        yield takeLatest(TOS_ACCEPTED, function*(action: TosAcceptedAction) {
          tracker.tosAccepted = yield select(areTosAccepted);
          yield call(trackTosAcceptedSaga(tracker), action);
        });

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
      createErrorAction()(e, { severity: Level.WARN });
    }
  };
