import { contributorIsSubscribed } from 'app/lmem/contributor';
import { AppAction } from 'app/actions';

export interface ContributorsState {
  total?: number;
  subscribed?: number;
}

const initialState: ContributorsState = {};

export default (
  state: ContributorsState = initialState,
  action: AppAction
): ContributorsState => {
  switch (action.type) {
    case 'CONTRIBUTORS_TRANSMITTED': {
      const { contributors } = action.payload;
      return {
        total: contributors.length,
        subscribed: contributors.filter(contributorIsSubscribed).length
      };
    }
    default:
      return state;
  }
};
