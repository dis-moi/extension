import {
  RECOMMENDATION_FOUND,
  REDUCE_RECOMMENDATION_IFRAME,
  EXTEND_RECOMMENDATION_IFRAME,
  DEACTIVATE,
  UNINSTALL,
  DISMISS_RECO,
  REPORT_RECO,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EDITORS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR
} from '../../constants/ActionTypes';

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case RECOMMENDATION_FOUND:
      const { recommendations } = payload;
      return state.set('recommendations', recommendations).set('reduced', false);

    case REDUCE_RECOMMENDATION_IFRAME:
      return state.set('reduced', true);

    case EXTEND_RECOMMENDATION_IFRAME:
      return state.set('reduced', false);

    case DEACTIVATE:
    case DISMISS_RECO:
    case REPORT_RECO:
    case UNINSTALL:
      return state.set('open', false);

    case INSTALLED_DETAILS:
      const { onInstalledDetails } = payload;
      return state.set('onInstalledDetails', onInstalledDetails);

    case CRITERIA: {
      const { criteria } = action;
      return state.set('criteria', criteria);
    }

    case SELECT_CRITERION: {
      const { slug } = payload;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], true));
    }

    case UNSELECT_CRITERION: {
      const { slug } = payload;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], false));
    }

    case EDITORS: {
      const { editors } = payload;
      return state.set('editors', editors);
    }

    case EXCLUDE_EDITOR: {
      const { id } = payload;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], true));
    }  

    case INCLUDE_EDITOR: {
      const { id } = payload;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], false));
    }

    default:
      return state;
  }
}