import * as R from 'ramda';
import {
  SUBSCRIBE,
  UNSUBSCRIBE,
  AppAction,
  ContributorAction
} from 'app/actions';

export type SubscriptionsState = number[];

export const getContributorId = ({
  payload: { contributor }
}: ContributorAction) =>
  typeof contributor !== 'number' ? contributor.id : contributor;

export const getContributorName = ({
  payload: { contributor }
}: ContributorAction) =>
  typeof contributor !== 'number' ? contributor.name : '';


export default function subscriptionsReducer(
  state: SubscriptionsState = [],
  action: AppAction
) {
  switch (action.type) {
    case SUBSCRIBE: {
      return R.append(getContributorId(action), state);
    }
    case UNSUBSCRIBE: {
      return R.without([getContributorId(action)], state);
    }
    default:
      return state;
  }
}
