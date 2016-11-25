import { 
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  SELECT_CRITERIUM,
  UNSELECT_CRITERIUM,
  RECEIVED_EDITORS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  DEACTIVATE,
  REACTIVATE_WEBSITE,
  UPDATE_DRAFT_RECOMMENDATIONS,
  INSTALLED,
} from '../constants/ActionTypes';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS } from '../constants/preferences';

export default function (state = {}, action) {
  const { type } = action;

  console.log('reducer', type, action);

  // FIXME: background state should be Immutable
  switch (type) {
    case RECEIVED_MATCHING_CONTEXTS:
      const { matchingContexts } = action;
      return Object.assign({}, state, { matchingContexts });

    case RECEIVED_CRITERIA:
      const { criteria } = action;

      criteria.forEach((criterium, slug) => {
        criterium.isSelected = true;
      });

      return Object.assign({}, state, { criteria });

    case SELECT_CRITERIUM: {
      const { slug } = action;

      const updatedCriteria = state.criteria;
      updatedCriteria.get(slug).isSelected = true;

      return Object.assign({}, state, { criteria: updatedCriteria });
    }

    case UNSELECT_CRITERIUM: {
      const { slug } = action;

      const updatedCriteria = state.criteria;
      updatedCriteria.get(slug).isSelected = false;

      return Object.assign({}, state, { criteria: updatedCriteria });
    }

    case RECEIVED_EDITORS:
      const { editors } = action;

      editors.forEach((editor, id) => {
        editor.isExcluded = true;
      });

      return Object.assign({}, state, { editors });

    case EXCLUDE_EDITOR: {
      const { id } = action;

      const updatedEditors = state.editors;
      updatedEditors.get(parseInt(id, 10)).isExcluded = true;

      return Object.assign({}, state, { editors: updatedEditors });
    }

    case INCLUDE_EDITOR: {
      const { id } = action;

      const updatedEditors = state.editors;
      updatedEditors.get(parseInt(id, 10)).isExcluded = false;

      return Object.assign({}, state, { editors: updatedEditors });
    }

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

