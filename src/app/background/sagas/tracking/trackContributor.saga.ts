import { SagaIterator } from '@redux-saga/types';
import { call } from '@redux-saga/core/effects';
import Tracker from 'types/Tracker';
import {
  ContributorAction,
  createErrorAction,
  getURLFromActionMeta
} from 'app/actions';
import {
  getContributorId,
  getContributorName
} from 'app/background/reducers/subscriptions.reducer';

export const trackContributorActionSaga = (tracker: Tracker) =>
  function*(action: ContributorAction): SagaIterator {
    try {
      yield call(tracker.trackEvent, {
        category: 'Contributor',
        action: action.type.toLowerCase(),
        name: getContributorName(action),
        value: getContributorId(action) as number,
        url: getURLFromActionMeta(action)
      });
    } catch (e) {
      createErrorAction()(e);
    }
  };
