import { SagaIterator } from '@redux-saga/types';
import { call, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import PostHog from 'posthog-node';
import {
  ACTION_CLICKED,
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
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { StandardAction } from 'libs/store/types';
import { isFeedBackRatingAction } from 'app/background/store/sagas/ratings/notices.saga';
import { loginSaga } from 'app/background/store/sagas/user.saga';
import { areTosAccepted } from 'app/background/store/selectors/prefs';
import { LOGIN } from 'libs/store/actions/user';
import { getProperties } from 'libs/tracking/posthog';
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
import { trackLoginSaga } from './trackUser.saga';

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
        const properties = yield call(getProperties);
        yield call(client.identify.bind(client), {
          distinctId,
          properties: {
            tosAccepted,
            name: distinctId,
            ...properties
          }
        });

        yield takeLatest(LOGIN, trackLoginSaga(client));
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
          ACTION_CLICKED,
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
