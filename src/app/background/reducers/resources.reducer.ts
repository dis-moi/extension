import * as R from 'ramda';
import {
  NOTICES_FETCHED,
  UPDATE_CONTRIBUTORS,
  UPDATE_MATCHING_CONTEXTS,
  UPDATE_RESTRICTED_CONTEXTS,
  AppAction
} from 'app/actions';
import { MatchingContext, RestrictedContext } from 'app/lmem/matchingContext';
import { Contributor } from 'app/lmem/contributor';
import forbiddenTabs from 'webext/forbiddenTabs';
import { Notice } from 'app/lmem/notice';

export interface ResourcesState {
  matchingContexts: MatchingContext[];
  restrictedContexts: RestrictedContext[];
  contributors: Contributor[];
  notices: Notice[];
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
  notices: []
};

export default function(
  state: ResourcesState = initialResources,
  action: AppAction
) {
  switch (action.type) {
    case UPDATE_MATCHING_CONTEXTS: {
      return {
        ...state,
        matchingContexts: action.payload.matchingContexts
      };
    }

    case UPDATE_RESTRICTED_CONTEXTS: {
      return {
        ...state,
        restrictedContexts: toTrueRestrictedContexts(action.payload).concat(
          regexpsToRestrictedContexts(forbiddenTabs)
        )
      };
    }

    case UPDATE_CONTRIBUTORS: {
      return {
        ...state,
        contributors: action.payload.contributors
      };
    }

    case NOTICES_FETCHED: {
      return {
        ...state,
        notices: R.uniqWith(
          R.eqProps('id'),
          R.concat(state.notices, action.payload)
        )
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
