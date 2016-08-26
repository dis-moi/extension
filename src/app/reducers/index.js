import { 
  MATCHING_OFFERS_FOUND, 
  RECEIVED_MATCHING_CONTEXTS, 
  DEACTIVATE,
  REACTIVATE_WEBSITE,
  UPDATE_DRAFT_RECOMMANDATIONS,
  INSTALLED
} from '../constants/ActionTypes';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../constants/preferences';

export default function (state = {}, action) {
  const { type } = action;

  console.log('reducer', type, action);

  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      return Object.assign({}, state, { matchingContexts: action.matchingContexts });

    case DEACTIVATE: {
      const { where, duration } = action;
      const deactivatedPref = state && state.preferences && state.preferences.deactivated || {};
      let newDeactivatedPref;

      if (where === DEACTIVATE_EVERYWHERE) {
        newDeactivatedPref = Object.assign(
          {}, deactivatedPref,
          {
            deactivatedEverywhereUntil: Date.now() + duration
          }
        );
      }
      else {
        deactivatedPref.deactivatedWebsites = new Set(deactivatedPref.deactivatedWebsites);
        deactivatedPref.deactivatedWebsites.add(where);
        newDeactivatedPref = deactivatedPref; // mutated
      }

      return Object.assign(
        {}, state,
        {
          preferences: Object.assign(
            {}, state.preferences,
            {
              deactivated: newDeactivatedPref
            }
          )
        }
      );
    }
    
    case REACTIVATE_WEBSITE: {
      const { website } = action;

      const deactivatedPref = state && state.preferences && state.preferences.deactivated || {};
      let newDeactivatedPref;

      deactivatedPref.deactivatedWebsites = new Set(deactivatedPref.deactivatedWebsites);
      deactivatedPref.deactivatedWebsites.delete(website);
      newDeactivatedPref = deactivatedPref; // mutated

      return Object.assign(
                {}, state,
        { 
          preferences: Object.assign(
                        {}, state.preferences,
            {
              deactivated: newDeactivatedPref
            }
                    )
        }
            );
    }

    case UPDATE_DRAFT_RECOMMANDATIONS: {
      const { draftRecommandations } = action;

      return Object.assign({}, state, { draftRecommandations });
    }

    case INSTALLED: {
      const { onInstalledDetails } = action;
      return Object.assign({}, state, { onInstalledDetails });
    }

    default:
      return state;
  }
}

