import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import fromJS from '../../utils/customFromJS';

import {
  RECEIVED_MATCHING_CONTEXTS,
  UPDATE_DRAFT_RECOMMENDATIONS,
  UNINSTALL
} from '../../constants/ActionTypes';

const initialResources = fromJS({
  matchingContexts: new ImmutableSet(),
  draftRecommendations: new ImmutableSet(),
});

export default function (state = initialResources, action) {
  const { type } = action;

  console.log('reducer', type, action);

  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      const { matchingContexts } = action;
      return state.set('matchingContexts', matchingContexts);

    case UPDATE_DRAFT_RECOMMENDATIONS: {
      const { draftRecommendations } = action;

      return state.set('draftRecommendations', draftRecommendations);
    }

    case UNINSTALL: {
      console.warn('Extension uninstallation is disabled when environment is development.');
      if (process.env.NODE_ENV !== 'development') {
        // Delay uninstallation to make sure tracking is done
        setTimeout(() => chrome.management.uninstallSelf(), 1000);
      }
      return state;
    }

    default:
      return state;
  }
}

