import { SagaIterator } from '@redux-saga/types';
import { call, put } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import {
  ContributorAction,
  createErrorAction,
  getURLFromActionMeta
} from 'app/actions';
import { getContributorName } from 'app/background/reducers/subscriptions.reducer';
import { Level } from '../../../utils/Logger';

export const trackContributorActionSaga = (tracker: Tracker) =>
  function*(action: ContributorAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'Contributor',
        action: action.type.toLowerCase(),
        name: getContributorName(action),
        value: 0,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
