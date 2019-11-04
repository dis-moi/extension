import { AppAction } from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';
import { Draft } from 'app/lmem/draft';
import { Contributor } from 'app/lmem/contributor';

export interface ResourcesState {
  matchingContexts: MatchingContext[];
  contributors: Contributor[];
  drafts: Draft[];
}

const initialResources: ResourcesState = {
  matchingContexts: [],
  contributors: [],
  drafts: []
};

export default function(
  state: ResourcesState = initialResources,
  action: AppAction
) {
  switch (action.type) {
    case 'api/UPDATE_MATCHING_CONTEXTS': {
      return {
        ...state,
        matchingContexts: action.payload.matchingContexts
      };
    }

    case 'api/UPDATE_CONTRIBUTORS': {
      return {
        ...state,
        contributors: action.payload.contributors
      };
    }

    /* Will be used ?
    case 'UNINSTALL': {
      console.warn(
        'Extension uninstallation is disabled when environment is development.'
      );
      if (process.env.NODE_ENV !== 'development') {
        // Delay uninstallation to make sure tracking is done
        setTimeout(() => chrome.management.uninstallSelf(), 1000);
      }
      return state;
    }
    */

    default:
      return state;
  }
}
