import { Contributor, ContributorId } from 'app/lmem/contributor';
import { ActionMeta, BaseAction } from '.';

export interface ContributorAction extends BaseAction {
  payload: { contributor: Contributor | ContributorId };
}

export const SUBSCRIBE = 'SUBSCRIBE';
export interface SubscribeAction extends ContributorAction {
  type: typeof SUBSCRIBE;
}
export const subscribe = (
  contributor: Contributor | ContributorId,
  meta?: ActionMeta
): SubscribeAction => ({
  type: SUBSCRIBE,
  payload: { contributor },
  meta
});

export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export interface UnsubscribeAction extends ContributorAction {
  type: typeof UNSUBSCRIBE;
}
export const unsubscribe = (
  contributor: Contributor,
  meta?: ActionMeta
): UnsubscribeAction => ({
  type: UNSUBSCRIBE,
  payload: { contributor },
  meta
});
