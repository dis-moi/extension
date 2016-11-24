import { 
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  SELECTED_CRITERIA,
  RECEIVED_EDITORS,
  EXCLUDED_EDITORS,
  DEACTIVATE,
  REACTIVATE_WEBSITE,
  UPDATE_DRAFT_RECOMMENDATIONS,
  INSTALLED,
} from '../constants/ActionTypes';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../constants/preferences';

export default function (state = {}, action) {
  const { type } = action;

  console.log('reducer', type, action);

  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      const { matchingContexts } = action;
      return Object.assign({}, state, { matchingContexts });

    case RECEIVED_CRITERIA:
      const { criteria } = action;
      return Object.assign({}, state, { criteria });

    case SELECTED_CRITERIA:
      const { selectedCriteria } = action;
      return Object.assign({}, state, { selectedCriteria });

    case RECEIVED_EDITORS:
      const { editors } = action;
      return Object.assign({}, state, { editors });

    case EXCLUDED_EDITORS:
      const { excludedEditors } = action;
      return Object.assign({}, state, { excludedEditors });

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

    case UPDATE_DRAFT_RECOMMENDATIONS: {
      const { draftRecommendations } = action;

      return Object.assign({}, state, { draftRecommendations });
    }

    case INSTALLED: {
      const { onInstalledDetails } = action;
      return Object.assign({}, state, { onInstalledDetails });
    }

    default:
      return state;
  }
}

