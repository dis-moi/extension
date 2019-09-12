import { StatefulContributor } from 'app/lmem/contributor';
import { AppAction, CONTRIBUTORS_TRANSMITTED } from 'app/actions';

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
