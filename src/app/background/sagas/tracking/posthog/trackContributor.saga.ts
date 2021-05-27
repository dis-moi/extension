import { SagaIterator } from '@redux-saga/types';
import PostHog from 'posthog-node';
import { call, put } from '@redux-saga/core/effects';
import { ContributorAction, getURLFromActionMeta } from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { Level } from 'app/utils/Logger';
import { loginSaga } from '../../user.saga';
import { getEventNameFromAction } from './';

export const trackContributorActionSaga = (client: PostHog) =>
  function*(action: ContributorAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          contributorId: action.payload,
          $current_url: getURLFromActionMeta(action)
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
