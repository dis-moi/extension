import { MatchingContext } from 'app/lmem/matchingContext';
import { AppAction } from 'app/actions';

export interface ResourcesState {
  matchingContexts: MatchingContext[];
  draftRecommendations: MatchingContext[];
}

const initialResources: ResourcesState = {
  matchingContexts: [],
  draftRecommendations: []
};

export default function(
  state: ResourcesState = initialResources,
  action: AppAction
) {
  switch (action.type) {
    case 'api/UPDATE_MATCHING_CONTEXTS':
      return { ...state, matchingContexts: action.payload.matchingContexts };

    /* Action is not existing yet, but will come soon.
    case 'UPDATE_DRAFT_RECOMMENDATIONS': {
      return {
        ...state,
        draftRecommendations: action.payload.draftRecommendations
      };
    }
    */

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
