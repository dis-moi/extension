import { AppAction } from 'app/actions';
import { MatchingContext, RestrictedContext } from 'app/lmem/matchingContext';
import { Draft } from 'app/lmem/draft';
import { Contributor } from 'app/lmem/contributor';
import forbiddenTabs from 'webext/forbiddenTabs';

export interface ResourcesState {
  matchingContexts: MatchingContext[];
  restrictedContexts: RestrictedContext[];
  contributors: Contributor[];
  drafts: Draft[];
}

const regexpsToRestrictedContexts = (regexps: RegExp[]) =>
  regexps.map(urlRegex => ({ urlRegex }));

const toTrueRestrictedContexts = (restrictedContexts: RestrictedContext[]) =>
  restrictedContexts.map(({ urlRegex }) => ({
    urlRegex: new RegExp(urlRegex)
  }));

const initialResources: ResourcesState = {
  matchingContexts: [],
  restrictedContexts: regexpsToRestrictedContexts(forbiddenTabs),
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

    case 'api/UPDATE_RESTRICTED_CONTEXTS': {
      return {
        ...state,
        restrictedContexts: toTrueRestrictedContexts(action.payload).concat(
          regexpsToRestrictedContexts(forbiddenTabs)
        )
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
