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
  UNAPPROVE_RECO,
  REPORT_RECO,
  DEACTIVATE,
  UNINSTALL,
  UPDATE_DRAFT_RECOMMENDATIONS,
  INSTALLED,
} from '../constants/ActionTypes';

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
        const slug = curr.get('slug');

        return !state.criteria.has(slug) ?
          acc.set(slug, curr.set('isSelected', true)) // new criteria from server are set to selected by default
          : acc.set(slug, state.criteria.get(slug));

      }, state.criteria);    

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
        const id = curr.get('id').toString();

        return !state.editors.has(id) ?
          acc.set(id, curr.set('isExcluded', false)) // new editors from server are set to not excluded by default
          : acc.set(id, state.editors.get(id));

      }, state.editors);

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

    case DISMISS_RECO:
    case REPORT_RECO: {
      const { id } = action;
      const dismissedRecos = state.dismissedRecos;

      return Object.assign({}, state, {dismissedRecos: dismissedRecos.add(id)});
    }

    case APPROVE_RECO: {
      const { id } = action;
      const approvedRecos = state.approvedRecos;

      return Object.assign({}, state, { approvedRecos: approvedRecos.add(id) });
    }

    case UNAPPROVE_RECO: {
      const { id } = action;
      const approvedRecos = state.approvedRecos;

      return Object.assign({}, state, { approvedRecos: approvedRecos.delete(id) });
    }

    case DEACTIVATE: {
      const { duration } = action;
      const deactivatedPref = state && state.websites && state.websites.deactivated || {};

      const newDeactivatedPref = Object.assign(
        {}, deactivatedPref,
        {
          deactivatedEverywhereUntil: Date.now() + duration
        }
      );

      return Object.assign(
        {}, state,
        {
          websites: Object.assign(
            {}, state.websites,
            {
              deactivated: newDeactivatedPref
            }
          )
        }
      );
    }

    case UNINSTALL: {
      console.warn('Extension uninstallation is disabled when environment is development.');
      if (process.env.NODE_ENV !== 'development') {
        // Delay uninstallation to make sure tracking is done
        setTimeout(() => chrome.management.uninstallSelf(), 1000);
      }
      return state;
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

