import Tracker from 'types/Tracker';
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
} from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { Level } from '../../../utils/Logger';

export const startTrackingSaga = (tracker: Tracker) =>
  function*(action: NoticesFoundAction): SagaIterator {
    try {
      const url = getURLFromActionMeta(action);
      yield call(tracker.trackPageView, {
        url,
        referrer: url,
        title: '/'
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackInstallSaga = (tracker: Tracker) =>
  function*(action: InstallationDetailsAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'Extension',
        action: action.payload.installationDetails.reason,
        name: action.payload.installationDetails.version,
        value: 0
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackLocationChangeSaga = (tracker: Tracker) =>
  function*(action: LocationChangedAction): SagaIterator {
    try {
      yield call(tracker.trackPageView, {
        url: getURLFromActionMeta(action),
        title: action.payload.location.pathname
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackCloseSaga = (tracker: Tracker) =>
  function*(action: CloseAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'UI',
        action: 'close',
        name: action.payload.cause.toString(),
        value: 0,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackBrowserActionClickedSaga = (tracker: Tracker) =>
  function*(action: BrowserActionClickedAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'UI',
        action: 'click',
        name: 'BrowserAction',
        value: 0,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };

export const trackTosAcceptedSaga = (tracker: Tracker) =>
  function*(action: TosAcceptedAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'Extension',
        action: 'tos_accepted',
        name: 'CGU Acceptées',
        value: 0,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
