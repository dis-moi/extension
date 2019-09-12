import * as R from 'ramda';
import { AppAction } from 'app/actions';

export interface PrefsState {
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  markedReadNotices: number[];
  tosAccepted: boolean;
}

const initialPrefs: PrefsState = {
  dismissedNotices: [],
  likedNotices: [],
  dislikedNotices: [],
  markedReadNotices: [],
  tosAccepted: false
};

function prefsReducer(state: PrefsState = initialPrefs, action: AppAction) {
  switch (action.type) {
    case 'FEEDBACK_ON_NOTICE':
      switch (action.payload.feedback) {
        case 'dismiss':
          return {
            ...state,
            dismissedNotices: R.concat(state.dismissedNotices, [
              action.payload.id
            ])
          };
        case 'undismiss':
          return {
            ...state,
            dismissedNotices: R.without(
              [action.payload.id],
              state.dismissedNotices
            )
          };

        case 'like':
          return {
            ...state,
            likedNotices: R.concat(state.likedNotices, [action.payload.id])
          };
        case 'unlike':
          return {
            ...state,
            likedNotices: R.without([action.payload.id], state.likedNotices)
          };

        case 'dislike':
          return {
            ...state,
            dislikedNotices: R.concat(state.dislikedNotices, [
              action.payload.id
            ])
          };
        case 'undislike':
          return {
            ...state,
            dislikedNotices: R.without(
              [action.payload.id],
              state.dislikedNotices
            )
          };
      }
      return state;

    case 'MARK_NOTICE_READ':
      return {
        ...state,
        markedReadNotices: R.uniq(
          R.concat(state.markedReadNotices, [action.payload])
        )
      };

    case 'TOS_ACCEPTED':
      return {
        ...state,
        tosAccepted: true
      };

    default:
      return state;
  }
}

export default prefsReducer;
