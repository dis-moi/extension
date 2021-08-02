import PostHog from 'posthog-node';
import { SagaIterator } from '@redux-saga/types';
import { call, put } from '@redux-saga/core/effects';
import {
  BrowserActionClickedAction,
  CloseAction,
  getURLFromActionMeta,
  InstallationDetailsAction,
  LocationChangedAction,
  NoticesFoundAction,
  TosAcceptedAction
} from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { loginSaga } from '../../user.saga';
import { getEventNameFromAction } from './';

export const startTrackingSaga = (client: PostHog) =>
  function*(action: NoticesFoundAction): SagaIterator {
    try {
      const url = getURLFromActionMeta(action);
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: '$pageview',
        properties: {
          $current_url: url,
          title: '/'
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackInstallSaga = (client: PostHog) =>
  function*(action: InstallationDetailsAction): SagaIterator {
    try {
      const { reason, version } = action.payload.installationDetails;
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          reason,
          version
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackLocationChangeSaga = (client: PostHog) =>
  function*(action: LocationChangedAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: '$pageview',
        properties: {
          $current_url: getURLFromActionMeta(action),
          title: action.payload.location.pathname
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackCloseSaga = (client: PostHog) =>
  function*(action: CloseAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          category: 'UI',
          cause: action.payload.cause.toString(),
          url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackBrowserActionClickedSaga = (client: PostHog) =>
  function*(action: BrowserActionClickedAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          category: 'UI',
          url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackTosAcceptedSaga = (client: PostHog) =>
  function*(action: TosAcceptedAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          category: 'Extension',
          url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
