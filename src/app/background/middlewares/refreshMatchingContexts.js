import { matchingTabIdToPortM } from '../tabs';
import { refreshMatchingContextsFromBackend } from '../actions/kraftBackend';

import {
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR,
  REFRESH_MATCHING_CONTEXTS,
} from '../../constants/ActionTypes';

export default function (store){
  return next => action => {

    function scheduleRefreshAfterward() {
      const result = next(action);

      store.dispatch({ type: REFRESH_MATCHING_CONTEXTS });

      return result;
    }

    function refreshMatchingContexts() {
      const state = store.getState();

      // update all content stores
      matchingTabIdToPortM.forEach(tabPortP => {
        tabPortP
          .then(tabPort => tabPort.postMessage({
            type: 'dispatch',
            action
          }));
      });

      const selectedCriteria = Array.from(state.get('prefs').get('criteria').keys())
        .filter(slug => {
          return state.get('prefs').get('criteria').get(slug).get('isSelected');
        });

      const excludedEditors = Array.from(state.get('prefs').get('editors').keys())
        .filter(id => {
          return state.get('prefs').get('editors').get(id).get('isExcluded');
        });

      store.dispatch(refreshMatchingContextsFromBackend(selectedCriteria, excludedEditors));

      return next(action);
    }

    switch (action.type) {
      case EXCLUDE_EDITOR:
      case INCLUDE_EDITOR:
      case SELECT_CRITERION:
      case UNSELECT_CRITERION:
        return scheduleRefreshAfterward();

      case REFRESH_MATCHING_CONTEXTS:
        return refreshMatchingContexts();

      default:
        return next(action);
    }

  };
}