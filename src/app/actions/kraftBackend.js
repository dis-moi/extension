import fetch from 'isomorphic-fetch'
import { RECEIVED_MATCHING_CONTEXTS } from '../constants/ActionTypes';

const serverUrl = 'http://lmem-craft-backend.cleverapps.io';

function fetchAllMatchingContexts() {
    console.log('fetch');
    return fetch(serverUrl + '/api/v1/matchingcontexts').then(response => {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    });
}

function receivedMatchingContexts(matchingContexts) {
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
