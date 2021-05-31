import { StatefulContributor } from 'libs/lmem/contributor';
import { AppAction, CONTRIBUTORS_TRANSMITTED } from 'libs/store/actions';

export type ContributorsState = StatefulContributor[];

const contributorsReducer = (
  state: ContributorsState = [],
  action: AppAction
): ContributorsState => {
  if (action.type === CONTRIBUTORS_TRANSMITTED) {
    return action.payload.contributors;
  }
  return state;
};

export default contributorsReducer;
