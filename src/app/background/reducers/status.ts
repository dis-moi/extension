import {
  AppAction,
  FETCH_NOTICES_FAILURE,
  NOTICES_FETCHED,
  REFRESH_CONTRIBUTORS_FAILED,
  REFRESH_MATCHING_CONTEXTS_FAILED,
  UPDATE_CONTRIBUTORS,
  UPDATE_MATCHING_CONTEXTS
} from 'app/actions';

export interface StatusState {
  backendLinkFailed: boolean;
}

const initialState: StatusState = { backendLinkFailed: false };

export default (
  state: StatusState = initialState,
  action: AppAction
): StatusState => {
  switch (action.type) {
    case REFRESH_MATCHING_CONTEXTS_FAILED:
    case REFRESH_CONTRIBUTORS_FAILED:
    case FETCH_NOTICES_FAILURE:
      return {
        ...state,
        backendLinkFailed: true
      };

    case UPDATE_MATCHING_CONTEXTS:
    case UPDATE_CONTRIBUTORS:
    case NOTICES_FETCHED:
      return { ...state, backendLinkFailed: false };

    default:
      return state;
  }
};
