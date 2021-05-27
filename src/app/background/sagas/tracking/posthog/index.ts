import { SagaIterator } from '@redux-saga/types';
import { call, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import PostHog from 'posthog-node';
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
import { areTosAccepted } from 'app/background/selectors/prefs';
import { Level } from 'app/utils/Logger';
import { StandardAction } from 'app/store/types';
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

export const getEventNameFromAction = (action: StandardAction) =>
  action.type
    .replaceAll('/', ' ')
    .replaceAll('_', ' ')
    .toLowerCase();

export default (client?: PostHog) =>
  function*(): SagaIterator {
    try {
      if (client) {
        const distinctId = yield call(loginSaga);
        const tosAccepted = yield select(areTosAccepted);
        yield call(client.identify.bind(client), {
          distinctId,
          properties: { tosAccepted, name: distinctId }
        });

        yield takeLatest(TOS_ACCEPTED, function*(action: TosAcceptedAction) {
          const tosAccepted = yield select(areTosAccepted);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          yield call(client.capture.bind(client), {
            distinctId,
            event: getEventNameFromAction(action),
            properties: {
              $set: { tosAccepted }
            }
          });
          yield call(trackTosAcceptedSaga(client), action);
        });

        yield takeLatest(INSTALLATION_DETAILS, trackInstallSaga(client));

        yield takeEvery([NOTICES_FOUND], startTrackingSaga(client));
        yield takeLatest(
          (action: AppAction) =>
            action.type === LOCATION_CHANGED &&
            action.payload.location.pathname !== '/',
          trackLocationChangeSaga(client)
        );
        yield takeEvery(
          BROWSER_ACTION_CLICKED,
          trackBrowserActionClickedSaga(client)
        );
        yield takeEvery(NOTICE_BADGED, trackNoticeBadgedSaga(client));
        yield takeEvery(NOTICE_DISPLAYED, trackNoticeDisplayedSaga(client));
        yield takeEvery(NOTICE_UNFOLDED, trackNoticeUnfoldedSaga(client));
        yield takeLatest(
          isFeedBackRatingAction,
          trackNoticeFeedbackSaga(client)
        );
        yield takeLatest(
          OUTBOUND_LINK_CLICKED,
          trackNoticeOutboundClickSaga(client)
        );

        yield takeEvery(
          [SUBSCRIBE, UNSUBSCRIBE],
          trackContributorActionSaga(client)
        );

        yield takeLatest(CLOSE, trackCloseSaga(client));
      }
    } catch (e) {
      createErrorAction()(e, { severity: Level.WARN });
    }
  };
