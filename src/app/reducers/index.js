import { Map as ImmutableMap } from 'immutable';
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

    case RECEIVED_CRITERIA: {
      const { criteria } = action;

      let newCriteria = state.criteria || criteria;

      if (Object.keys(state).indexOf('criteria') === -1) // first visit, all criteria are set to selected by default
        criteria.forEach((criterium, slug) => {
          newCriteria = newCriteria.setIn([slug, 'isSelected'], true);
        });
      else // other visits, new criteria from server are set to selected by default
        criteria.forEach((criterium, slug) => {
          if (!state.criteria.has(slug))
            newCriteria = newCriteria.setIn([slug, 'isSelected'], true);
        });

      return Object.assign({}, state, { criteria: newCriteria });
    }

    case SELECT_CRITERIUM: {
      const { slug } = action;
      const criteria = state.criteria;

      return Object.assign({}, state, {criteria: criteria.setIn([slug, 'isSelected'], true)});
    }

    case UNSELECT_CRITERIUM: {
      const { slug } = action;
      const criteria = state.criteria;

      return Object.assign({}, state, {criteria: criteria.setIn([slug, 'isSelected'], false)});
    }

    case RECEIVED_EDITORS: {
      const { editors } = action;

      let newEditors = state.editors || editors;

      if (Object.keys(state).indexOf('editors') === -1) // first visit, all editors are set to not excluded by default
        editors.forEach((editor, id) => {
          newEditors = editors.setIn([id, 'isExcluded'], false);
        });
      else // other visits, new editors from server are set to not excluded by default
        editors.forEach((editor, id) => { 
          if (!state.editors.has(id))
            newEditors = editors.setIn([id, 'isExcluded'], false);
        });

      return Object.assign({}, state, { editors: newEditors });
    }

    case EXCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.editors;

      return Object.assign({}, state, {editors: editors.setIn([id, 'isExcluded'], true)});
    }

    case INCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.editors;

      return Object.assign({}, state, {editors: editors.setIn([id, 'isExcluded'], false)});
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

