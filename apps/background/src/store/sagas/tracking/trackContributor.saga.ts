import { SagaIterator } from '@redux-saga/types';
import { call, put } from '@redux-saga/core/effects';
import Tracker from 'libs/types/Tracker';
import { ContributorAction, getURLFromActionMeta } from 'src/app/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from '../../../../../../libs/utils/Logger';

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
