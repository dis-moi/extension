import fetch from 'isomorphic-fetch';
import { LMEM_BACKEND_ORIGIN } from 'app/constants/origins';
import { MatchingContext } from 'app/lmem/matchingContext';
import { Dispatch } from 'redux';
import { BaseAction } from '.';

function fetchJson(url: string) {
  return fetch(url).then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
}

export function makeUrlFromFilters() {
  return LMEM_BACKEND_ORIGIN + '/api/v2/matchingcontexts';
}

export function fetchMatchingContexts(): Promise<MatchingContext[]> {
  return fetchJson(makeUrlFromFilters());
}

export interface ReceivedMatchingContextsAction extends BaseAction {
  type: 'api/UPDATE_MATCHING_CONTEXTS';
  payload: { matchingContexts: MatchingContext[] };
}
export const receivedMatchingContexts = (
  matchingContexts: MatchingContext[]
): ReceivedMatchingContextsAction => ({
  type: 'api/UPDATE_MATCHING_CONTEXTS',
  payload: { matchingContexts }
});

export function dispatchInitialStateFromBackend() {
  return (dispatch: Dispatch) => {
    fetchMatchingContexts().then((matchingContexts: MatchingContext[]) =>
      dispatch(receivedMatchingContexts(matchingContexts))
    );
  };
}

export interface RefreshMatchingContextsAction extends BaseAction {
  type: 'REFRESH_MATCHING_CONTEXTS';
}
export const refreshMatchingContexts = (): RefreshMatchingContextsAction => ({
  type: 'REFRESH_MATCHING_CONTEXTS'
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
