import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';
import fromJS from '../../utils/customFromJS';

import {
  INSTALLED,
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
  DEACTIVATE
} from '../../constants/ActionTypes';


const initialPrefs = fromJS({
  websites: new ImmutableSet(),
  criteria: new ImmutableMap(),
  editors: new ImmutableMap(),
  dismissedRecos: new ImmutableSet(),
  approvedRecos: new ImmutableSet(),
  onInstalledDetails: new ImmutableMap()
});

export default function (state = initialPrefs, action) {
  const { type } = action;

  console.log('reducer', type, action);

  switch (type) {
    case INSTALLED: {
      const { onInstalledDetails } = action;
      return state.set('onInstalledDetails', ImmutableMap(onInstalledDetails)); // eslint-disable-line
    }

    case RECEIVED_CRITERIA: {
      const { criteria } = action;
      let newCriteria;

      newCriteria = criteria.reduce((acc, curr) => {
        const slug = curr.get('slug');

        return !state.get('criteria').has(slug)
          ? acc.set(slug, curr.set('isSelected', true)) // new criteria from server are set to selected by default
          : acc.set(slug, state.get('criteria').get(slug));

      }, state.get('criteria'));    

      return state.set('criteria', newCriteria);
    }

    case SELECT_CRITERION: {
      const { slug } = action;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], true));
    }

    case UNSELECT_CRITERION: {
      const { slug } = action;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], false));
    }

    case RECEIVED_EDITORS: {
      const { editors } = action;
      let newEditors;

      newEditors = editors.reduce((acc, curr) => { 
        const id = curr.get('id').toString();

        return !state.get('editors').has(id)
          ? acc.set(id, curr.set('isExcluded', false)) // new editors from server are set to not excluded by default
          : acc.set(id, state.get('editors').get(id));

      }, state.get('editors'));

      return state.set('editors', newEditors);
    }

    case EXCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], true));
    }

    case INCLUDE_EDITOR: {
      const { id } = action;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], false));
    }

    case DISMISS_RECO:
    case REPORT_RECO: {
      const { id } = action;
      const dismissedRecos = state.get('dismissedRecos');

      return state.set('dismissedRecos', dismissedRecos.add(id));
    }

    case APPROVE_RECO: {
      const { id } = action;
      const approvedRecos = state.get('approvedRecos');

      return state.set('approvedRecos', approvedRecos.add(id));
    }

    case UNAPPROVE_RECO: {
      const { id } = action;
      const approvedRecos = state.get('approvedRecos');

      return state.set('approvedRecos', approvedRecos.delete(id));
    }

    case DEACTIVATE: {
      const { duration } = action;

      return state.setIn(['websites', 'deactivated', 'everywhereUntil'], Date.now() + duration);
    }

    default:
      return state;
  }
}

