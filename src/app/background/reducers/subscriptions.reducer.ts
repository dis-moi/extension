import * as R from 'ramda';
import { AppAction, ContributorAction } from 'app/actions';
import { SUBSCRIBE, UNSUBSCRIBE } from 'app/constants/ActionTypes';

export type SubscriptionsState = number[];

export const getContributorId = ({
  payload: { contributor }
}: ContributorAction) =>
  typeof contributor !== 'number' ? contributor.id : contributor;

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
