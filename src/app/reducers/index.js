import { Map as ImmutableMap } from 'immutable';
import { 
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  RECEIVED_EDITORS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  DISMISS_RECO,
  APPROVE_RECO,
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
      let newCriteria;
      
      newCriteria = criteria.reduce((acc, curr) => {
        let output = acc;

        if (!state.criteria.has(curr.get('slug'))) // new criteria from server are set to selected by default
          output = acc.setIn([curr.get('slug'), 'isSelected'], true);
        
        return output;

      }, criteria);

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
      let newEditors;

      newEditors = editors.reduce((acc, curr) => { 
        let output = acc;
        if (!state.editors.has(curr.get('id').toString())) // new editors from server are set to not excluded by default
          output = acc.setIn([curr.get('id').toString(), 'isExcluded'], false);
        
        return output;

      }, editors);

      return Object.assign({}, state, { editors: newEditors });
    }

    case EXCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.editors;

      return Object.assign({}, state, {editors: editors.setIn([id.toString(), 'isExcluded'], true)});
    }

    case INCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.editors;

      return Object.assign({}, state, {editors: editors.setIn([id.toString(), 'isExcluded'], false)});
    }

    case DISMISS_RECO: {
      const { id } = action;
      const dismissedRecos = state.dismissedRecos;

      return Object.assign({}, state, {dismissedRecos: dismissedRecos.add(id)});
    }

    case APPROVE_RECO: {
      const { id } = action;
      const approvedRecos = state.approvedRecos;

      return Object.assign({}, state, {approvedRecos: approvedRecos.add(id)});
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

