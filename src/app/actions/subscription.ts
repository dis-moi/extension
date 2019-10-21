import { Contributor, ContributorId } from 'app/lmem/contributor';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';
import ContributorRatingType from 'app/lmem/ContributorRatingType';
import { ActionMeta, BaseAction } from '.';

export interface ContributorAction extends BaseAction {
  payload: { contributor: Contributor | ContributorId };
  meta: ActionMeta & {
    ratingType?: ContributorRatingType;
  };
}

export interface SubscribeAction extends ContributorAction {
  type: typeof SUBSCRIBE;
  meta: ActionMeta & {
    ratingType: ContributorRatingType.SUBSCRIBE;
  };
}
export const subscribe = (
  contributor: Contributor | ContributorId,
  meta?: ActionMeta
): SubscribeAction => ({
  type: SUBSCRIBE,
  payload: { contributor },
  meta: {
    ...meta,
    ratingType: ContributorRatingType.SUBSCRIBE
  }
});

export interface UnsubscribeAction extends ContributorAction {
  type: typeof UNSUBSCRIBE;
  meta: ActionMeta & {
    ratingType: ContributorRatingType.UNSUBSCRIBE;
  };
}
export const unsubscribe = (
  contributor: Contributor,
  meta?: ActionMeta
): UnsubscribeAction => ({
  type: UNSUBSCRIBE,
  payload: { contributor },
  meta: {
    ...meta,
    ratingType: ContributorRatingType.UNSUBSCRIBE
  }
});
