import { ContributorId } from 'app/lmem/contributor';
import { ActionMeta, BaseAction, ErrorAction } from '.';
import { Level } from 'app/utils/Logger';

export interface ContributorAction extends BaseAction {
  payload: ContributorId;
}

export const SUBSCRIBE = 'SUBSCRIBE';
export const subscribe = (contributorId: ContributorId, meta?: ActionMeta) => ({
  type: SUBSCRIBE as typeof SUBSCRIBE,
  payload: contributorId,
  meta
});
export type SubscribeAction = ReturnType<typeof subscribe>;

export const SUBSCRIBED = 'SUBSCRIBED';
export interface SubscribedAction extends ContributorAction {
  type: typeof SUBSCRIBED;
  payload: ContributorId;
}
export const subscribed = (
  contributorId: ContributorId,
  meta?: ActionMeta
): SubscribedAction => ({
  type: SUBSCRIBED,
  payload: contributorId,
  meta
});

export const SUBSCRIBE_FAILED = 'SUBSCRIBE_FAILED';
export interface SubscribeFailedAction extends ErrorAction {
  type: typeof SUBSCRIBE_FAILED;
}
export const subscribeFailed = (
  error: Error,
  meta?: ActionMeta
): SubscribeFailedAction => ({
  type: SUBSCRIBE_FAILED,
  payload: error,
  error: true,
  meta: {
    ...meta,
    severity: Level.ERROR
  }
});

export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export interface UnsubscribeAction extends ContributorAction {
  type: typeof UNSUBSCRIBE;
}
export const unsubscribe = (
  contributorId: ContributorId,
  meta?: ActionMeta
): UnsubscribeAction => ({
  type: UNSUBSCRIBE,
  payload: contributorId,
  meta
});

export const UNSUBSCRIBED = 'UNSUBSCRIBED';
export interface UnsubscribedAction extends ContributorAction {
  type: typeof UNSUBSCRIBED;
  payload: ContributorId;
}
export const unsubscribed = (
  contributorId: ContributorId,
  meta?: ActionMeta
): UnsubscribedAction => ({
  type: UNSUBSCRIBED,
  payload: contributorId,
  meta
});

export const UNSUBSCRIBED_FAILED = 'UNSUBSCRIBED_FAILED';
export interface UnsubscribedFailedAction extends ErrorAction {
  type: typeof UNSUBSCRIBED_FAILED;
}
export const unsubscribedFailed = (
  error: Error,
  meta?: ActionMeta
): UnsubscribedFailedAction => ({
  type: UNSUBSCRIBED_FAILED,
  payload: error,
  error: true,
  meta: {
    ...meta,
    severity: Level.ERROR
  }
});

export type SubscriptionAction =
  | SubscribeAction
  | SubscribedAction
  | SubscribeFailedAction
  | UnsubscribeAction
  | UnsubscribedAction
  | UnsubscribedFailedAction;
