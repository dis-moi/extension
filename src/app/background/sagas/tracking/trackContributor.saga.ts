import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { Level } from '../../../utils/Logger';
import Tracker from 'types/Tracker';
import { ContributorAction, getURLFromActionMeta } from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';

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
