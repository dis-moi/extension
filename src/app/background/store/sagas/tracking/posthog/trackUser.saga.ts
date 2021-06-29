import { SagaIterator } from '@redux-saga/types';
import { call, put, select } from '@redux-saga/core/effects';
import PostHog from 'posthog-node';
import { createErrorAction } from 'libs/store/actions/helpers';
import { Level } from 'libs/utils/Logger';
import { getInitialProperties } from 'libs/tracking/posthog';
import { LoginAction } from 'libs/store/actions/user';
import { areTosAccepted } from 'app/background/store/selectors/prefs';

export const trackLoginSaga = (client: PostHog) =>
  function*({ payload: distinctId }: LoginAction): SagaIterator {
    try {
      const tosAccepted = yield select(areTosAccepted);
      const initialProperties = yield call(getInitialProperties);
      yield call(client.identify.bind(client), {
        distinctId,
        properties: {
          tosAccepted,
          name: distinctId,
          ...initialProperties
        }
      });
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.WARN }));
    }
  };
