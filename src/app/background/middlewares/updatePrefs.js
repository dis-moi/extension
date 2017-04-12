import { matchingTabIdToPortP } from '../tabs';
import { refreshMatchingContextsFromBackend } from '../actions/kraftBackend';

import {
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR
} from '../../constants/ActionTypes';

export default function (store){
  return next => action => {

    switch (action.type) {
      case EXCLUDE_EDITOR:
      case INCLUDE_EDITOR:
      case SELECT_CRITERION:
      case UNSELECT_CRITERION:
        const state = store.getState();

        // update all content stores
        matchingTabIdToPortP.forEach(tabPortP => {
          tabPortP
          .then(tabPort => tabPort.postMessage({
            type: 'dispatch',
            action
          }));
        });

        // fetch updated matching contexts
        let selectedCriteria = Array.from(state.get('prefs').get('criteria').keys())
        .filter(slug => {
          return state.get('prefs').get('criteria').get(slug).get('isSelected');  
        });

        let excludedEditors = Array.from(state.get('prefs').get('editors').keys())
        .filter(id => {
          return state.get('prefs').get('editors').get(id).get('isExcluded');
        });

        store.dispatch(refreshMatchingContextsFromBackend(selectedCriteria, excludedEditors));

        break;
      default:
        break;
    }

    return next(action);
  };
}