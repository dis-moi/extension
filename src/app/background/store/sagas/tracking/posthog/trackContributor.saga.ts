import { SagaIterator } from '@redux-saga/types';
import PostHog from 'posthog-node';
import { call, put, select } from '@redux-saga/core/effects';
import { ContributorAction, getURLFromActionMeta } from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { getSubscriptions } from 'app/background/store/selectors/subscriptions.selectors';
import { loginSaga } from '../../user.saga';
import { getEventNameFromAction } from './';

export const trackContributorActionSaga = (client: PostHog) =>
  function*(action: ContributorAction): SagaIterator {
    try {
      const distinctId = yield call(loginSaga);
      const subscriptions = yield select(getSubscriptions);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      yield call(client.capture.bind(client), {
        distinctId,
        event: getEventNameFromAction(action),
        properties: {
          contributorId: action.payload,
          $current_url: getURLFromActionMeta(action),
          $set: { subscriptions }
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
