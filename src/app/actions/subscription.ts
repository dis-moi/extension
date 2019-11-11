import { Contributor, ContributorId } from 'app/lmem/contributor';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';
import { ActionMeta, BaseAction } from '.';

export interface ContributorAction extends BaseAction {
  payload: { contributor: Contributor | ContributorId };
}

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
