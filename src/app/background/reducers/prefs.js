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
  DISMISS_NOTICE, UNDISMISS_NOTICE,
  LIKE_NOTICE, UNLIKE_NOTICE,
  DISLIKE_NOTICE, UNDISLIKE_NOTICE,
  REPORT_NOTICE,
  DEACTIVATE
} from '../../constants/ActionTypes';


const initialPrefs = fromJS({
  websites: new ImmutableSet(),
  criteria: new ImmutableMap(),
  editors: new ImmutableMap(),
  dismissedNotices: new ImmutableSet(),
  likedNotices: new ImmutableSet(),
  dislikedNotices: new ImmutableSet(),
  reportedNotices: new ImmutableSet(),
  onInstalledDetails: new ImmutableMap()
});

const addToSet = element => immutableSet => immutableSet.add(element);
const deleteFromSet = element => immutableSet => immutableSet.delete(element);

export default function (state = initialPrefs, action) {
  const { type, payload } = action;

  switch (type) {
    case INSTALLED: {
      const { onInstalledDetails } = payload;
      return state.set('onInstalledDetails', ImmutableMap(onInstalledDetails)); // eslint-disable-line
    }

    case RECEIVED_CRITERIA: {
      const { criteria } = payload;
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
      const { slug } = payload;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], true));
    }

    case UNSELECT_CRITERION: {
      const { slug } = action;
      const criteria = state.get('criteria');

      return state.set('criteria', criteria.setIn([slug, 'isSelected'], false));
    }

    case RECEIVED_EDITORS: {
      const { editors } = payload;
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
      const { id } = payload;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], true));
    }

    case INCLUDE_EDITOR: {
      const { id } = payload;
      const editors = state.get('editors');

      return state.set('editors', editors.setIn([id.toString(), 'isExcluded'], false));
    }

    case REPORT_NOTICE: return state.update('reportedNotices', addToSet(payload.id))

    case DISMISS_NOTICE:
      return state.update('dismissedNotices', addToSet(payload.id))
    case UNDISMISS_NOTICE:
      return state.update('dismissedNotices', deleteFromSet(payload.id))

    case LIKE_NOTICE:
      return state.update('likedNotices', addToSet(payload.id))
    case UNLIKE_NOTICE:
      return state.update('likedNotices', deleteFromSet(payload.id))

    case DISLIKE_NOTICE:
      return state.update('dislikedNotices', addToSet(payload.id))
    case UNDISLIKE_NOTICE:
      return state.update('dislikedNotices', deleteFromSet(payload.id))


    case DEACTIVATE: {
      const { duration } = payload;

      return state.setIn(['websites', 'deactivated', 'everywhereUntil'], Date.now() + duration);
    }

    default:
      return state;
  }
}

