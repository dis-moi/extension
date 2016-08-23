import fetch from 'isomorphic-fetch';
import { RECEIVED_MATCHING_CONTEXTS } from '../constants/ActionTypes';

const LMEM_BACKEND_ORIGIN = process.env.LMEM_BACKEND_ORIGIN;

if(typeof LMEM_BACKEND_ORIGIN !== 'string'){
  throw new TypeError('Missing LMEM backend origin ' + LMEM_BACKEND_ORIGIN);
}

function fetchAllMatchingContexts() {
  console.log('fetch');
  return fetch(LMEM_BACKEND_ORIGIN + '/api/v1/matchingcontexts').then(response => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  });
}

export function receivedMatchingContexts(matchingContexts) {
  console.log('received');
  return {
    type: RECEIVED_MATCHING_CONTEXTS,
    payload: matchingContexts
  };
}

export function dispatchInitialStateFromBackend() {
  console.log('dispatch');
  return dispatch => {
    return fetchAllMatchingContexts().then(json => dispatch(receivedMatchingContexts(json)));
  };
}
