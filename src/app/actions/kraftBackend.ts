import { MatchingContext } from 'app/lmem/matchingContext';
import { Dispatch } from 'redux';
import { BaseAction, ErrorAction } from '.';
import fetchMatchingContexts from '../../api/fetchMatchingContexts';

export interface ReceivedMatchingContextsAction extends BaseAction {
  type: 'api/UPDATE_MATCHING_CONTEXTS';
  payload: { matchingContexts: MatchingContext[] };
}
export const receivedMatchingContexts = (
  matchingContexts: MatchingContext[]
): ReceivedMatchingContextsAction => ({
  type: 'api/UPDATE_MATCHING_CONTEXTS',
  payload: { matchingContexts },
  meta: { tracked: false }
});

export function dispatchInitialStateFromBackend() {
  return (dispatch: Dispatch) =>
    fetchMatchingContexts().then((matchingContexts: MatchingContext[]) =>
      dispatch(receivedMatchingContexts(matchingContexts))
    );
}

export interface RefreshMatchingContextsAction extends BaseAction {
  type: 'REFRESH_MATCHING_CONTEXTS';
}
export const refreshMatchingContexts = (): RefreshMatchingContextsAction => ({
  type: 'REFRESH_MATCHING_CONTEXTS',
  meta: { tracked: false }
});

export interface RefreshMatchingContextsFailedAction extends ErrorAction {
  type: 'REFRESH_MATCHING_CONTEXTS_FAILED';
}
export const refreshMatchingContextsFailed = (
  e: Error
): RefreshMatchingContextsFailedAction => ({
  type: 'REFRESH_MATCHING_CONTEXTS_FAILED',
  payload: e,
  error: true
});

export function refreshMatchingContextsEvery(milliseconds: number) {
  function recurse(dispatch: Dispatch) {
    setTimeout(() => {
      dispatch(refreshMatchingContexts());
      recurse(dispatch);
    }, milliseconds);
  }

  return recurse;
}
