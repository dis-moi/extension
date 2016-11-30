import { Map as ImmutableMap } from 'immutable';
import { 
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  SELECT_CRITERION,
  UNSELECT_CRITERION,
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

      let oldCriteria = state.criteria || criteria;
      let newCriteria;

      if (!Object.keys(state).includes('criteria')){ // first visit, all criteria are set to selected by default
        newCriteria = oldCriteria.reduce((acc, curr) => {
          return acc.setIn([curr.get('slug'), 'isSelected'], true);
        }, oldCriteria);
      }
      else { // other visits, new criteria from server are set to selected by default
        newCriteria = oldCriteria.reduce((acc, curr) => {
          let output = acc;

          if (!state.criteria.has(curr.get('slug')))
            output = acc.setIn([curr.get('slug'), 'isSelected'], true);

          return output;

        }, oldCriteria);
      }

      return Object.assign({}, state, { criteria: newCriteria });
    }

    case SELECT_CRITERION: {
      const { slug } = action;
      const criteria = state.criteria;

      return Object.assign({}, state, {criteria: criteria.setIn([slug, 'isSelected'], true)});
    }

    case UNSELECT_CRITERION: {
      const { slug } = action;
      const criteria = state.criteria;

      return Object.assign({}, state, {criteria: criteria.setIn([slug, 'isSelected'], false)});
    }

    case RECEIVED_EDITORS: {
      const { editors } = action;

      let oldEditors = state.editors || editors;
      let newEditors;

      if (!Object.keys(state).includes('editors')) // first visit, all editors are set to not excluded by default
        newEditors = oldEditors.reduce((acc, curr) => {
          return acc.setIn([curr.get('id').toString(), 'isExcluded'], false);
        }, oldEditors);
      else // other visits, new editors from server are set to not excluded by default
        newEditors = oldEditors.reduce((acc, curr) => { 
          let output = acc;

          if (!state.editors.has(curr.get('id').toString()))
            output = acc.setIn([curr.get('id').toString(), 'isExcluded'], false);

          return output;

        }, oldEditors);

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

