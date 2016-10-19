import fetch from 'isomorphic-fetch';
import { RECEIVED_MATCHING_CONTEXTS } from '../constants/ActionTypes';

import {LMEM_BACKEND_ORIGIN} from '../constants/origins';


function fetchAllMatchingContexts() {
  return fetch(LMEM_BACKEND_ORIGIN + '/api/v2/matchingcontexts').then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
}

export function receivedMatchingContexts(matchingContexts) {
  return {
    type: RECEIVED_MATCHING_CONTEXTS,
    matchingContexts
  };
}

export function dispatchInitialStateFromBackend() {
  return dispatch => {
    return fetchAllMatchingContexts().then(json => dispatch(receivedMatchingContexts(json)));
  };
}
