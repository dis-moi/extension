import {
  RECOMMENDATION_FOUND,
  REDUCE_RECOMMENDATION_IFRAME,
  EXTEND_RECOMMENDATION_IFRAME,
  DEACTIVATE,
  OPEN_PREFERENCE_PANEL,
  CLOSE_PREFERENCE_PANEL,
  DEACTIVATED_WEBSITES,
  REACTIVATE_WEBSITE,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECTED_CRITERIA,
  EDITORS,
  EXCLUDED_EDITORS
} from '../../constants/ActionTypes';

export default function (state = {}, action) {
  const { type } = action;

  switch (type) {
    case RECOMMENDATION_FOUND:
      const { recommendations } = action;
      return state.set('recommendations', recommendations).set('reduced', false);

    case REDUCE_RECOMMENDATION_IFRAME:
      return state.set('reduced', true);

    case EXTEND_RECOMMENDATION_IFRAME:
      return state.set('reduced', false);

    case DEACTIVATE:
      return state.set('open', false);

    case OPEN_PREFERENCE_PANEL:
      const { panel } = action;
      return state.set('preferenceScreenPanel', panel);

    case CLOSE_PREFERENCE_PANEL:
      return state.set('preferenceScreenPanel', undefined);

    case DEACTIVATED_WEBSITES:
      const { deactivatedWebsites } = action;
      return state.set('deactivatedWebsites', deactivatedWebsites);

    case INSTALLED_DETAILS:
      const { onInstalledDetails } = action;
      return state.set('onInstalledDetails', onInstalledDetails);

    case REACTIVATE_WEBSITE:
      const { website } = action;
      return state.set('deactivatedWebsites', state.get('deactivatedWebsites').delete(website));

    case CRITERIA:
      const { criteria } = action;
      return state.set('criteria', criteria);

    case SELECTED_CRITERIA:
      const { selectedCriteria } = action;
      return state.set('selectedCriteria', selectedCriteria);

    case EDITORS:
      const { editors } = action;
      return state.set('editors', editors);

    case EXCLUDED_EDITORS:
      const { excludedEditors } = action;
      return state.set('excludedEditors', excludedEditors);

    default:
      return state;
  }
}