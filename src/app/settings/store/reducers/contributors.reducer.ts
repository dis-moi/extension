import { Contributor } from 'app/lmem/contributor';
import { AppAction } from 'app/actions';

export type ContributorsState = Contributor[];

const contributorsReducer = (
  state: ContributorsState = [],
  action: AppAction
): ContributorsState => {
  if (action.type === 'CONTRIBUTORS_TRANSMITTED') {
    return action.payload.contributors;
  }
  return state;
};

export default contributorsReducer;
