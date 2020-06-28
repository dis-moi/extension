import { ActionMeta, BaseAction, ErrorAction } from 'app/actions';
import { Subscriptions } from 'app/lmem/subscription';
import { Level } from 'app/utils/Logger';

export const FETCH_SUBSCRIPTIONS = 'FETCH_SUBSCRIPTIONS';
export interface FetchSubscriptionsAction extends BaseAction {
  type: typeof FETCH_SUBSCRIPTIONS;
}
export const fetchSubscriptions = (
  meta?: ActionMeta
): FetchSubscriptionsAction => ({
  type: FETCH_SUBSCRIPTIONS,
  meta
});

export const FETCH_SUBSCRIPTIONS_SUCCESS = 'FETCH_SUBSCRIPTIONS_SUCCESS';
export interface FetchSubscriptionsSuccessAction extends BaseAction {
  type: typeof FETCH_SUBSCRIPTIONS_SUCCESS;
  payload: Subscriptions;
}
export const fetchSubscriptionsSuccess = (
  subscriptions: Subscriptions,
  meta?: ActionMeta
): FetchSubscriptionsSuccessAction => ({
  type: FETCH_SUBSCRIPTIONS_SUCCESS,
  payload: subscriptions,
  meta
});

export const FETCH_SUBSCRIPTIONS_FAILURE = 'FETCH_SUBSCRIPTIONS_FAILURE';
export interface FetchSubscriptionsFailureAction extends ErrorAction {
  type: typeof FETCH_SUBSCRIPTIONS_FAILURE;
}
export const fetchSubscriptionsFailure = (
  error: Error,
  meta?: ActionMeta
): FetchSubscriptionsFailureAction => ({
  type: FETCH_SUBSCRIPTIONS_FAILURE,
  payload: error,
  error: true,
  meta: {
    ...meta,
    severity: Level.ERROR
  }
});
