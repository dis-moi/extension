import { SagaIterator } from '@redux-saga/types';
import { call, put } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import { ContributorAction, getURLFromActionMeta } from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { Level } from '../../../utils/Logger';

export const trackContributorActionSaga = (tracker: Tracker) =>
  function*(action: ContributorAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'Contributor',
        action: action.type.toLowerCase(),
        name: `${action.payload}`,
        value: 0,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
