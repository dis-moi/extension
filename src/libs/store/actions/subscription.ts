import { Contributor } from 'libs/domain/contributor';
import { Level } from 'libs/utils/Logger';
import { ActionMeta, BaseAction, ErrorAction } from '.';

export type ContributorActionMeta = ActionMeta & { manual?: boolean };

export interface ContributorAction extends BaseAction {
  payload: Contributor['id'];
  meta: ContributorActionMeta;
}

export const SUBSCRIBE = 'SUBSCRIBE';
export const subscribe = (
  contributorId: Contributor['id'],
  meta?: ContributorActionMeta
) => ({
  type: SUBSCRIBE as typeof SUBSCRIBE,
  payload: contributorId,
  meta: { manual: true, ...meta }
});
export type SubscribeAction = ReturnType<typeof subscribe>;

export const autoSubscribe = (
  contributorId: Contributor['id'],
  meta?: ContributorActionMeta
) => subscribe(contributorId, { ...meta, manual: false });

export const SUBSCRIBED = 'SUBSCRIBED';
export interface SubscribedAction extends ContributorAction {
  type: typeof SUBSCRIBED;
  payload: Contributor['id'];
}
export const subscribed = (
  contributorId: Contributor['id'],
  meta?: ContributorActionMeta
): SubscribedAction => ({
  type: SUBSCRIBED,
  payload: contributorId,
  meta: { manual: true, ...meta }
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
  contributorId: Contributor['id'],
  meta?: ActionMeta
): UnsubscribeAction => ({
  type: UNSUBSCRIBE,
  payload: contributorId,
  meta: { manual: true, ...meta }
});

export const UNSUBSCRIBED = 'UNSUBSCRIBED';
export interface UnsubscribedAction extends ContributorAction {
  type: typeof UNSUBSCRIBED;
  payload: Contributor['id'];
}
export const unsubscribed = (
  contributorId: Contributor['id'],
  meta?: ActionMeta
): UnsubscribedAction => ({
  type: UNSUBSCRIBED,
  payload: contributorId,
  meta: { manual: true, ...meta }
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
