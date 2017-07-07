import { matchingTabIdToPortP } from '../tabs';
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

    switch (action.type) {
      // Update prefs and explicit refresh...
      case EXCLUDE_EDITOR:
      case INCLUDE_EDITOR:
      case SELECT_CRITERION:
      case UNSELECT_CRITERION:
      case REFRESH_MATCHING_CONTEXTS:

        const state = store.getState();

        // update all content stores
        matchingTabIdToPortP.forEach(tabPortP => {
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

        break;

      default: break;
    }

    return next(action);
  };
}