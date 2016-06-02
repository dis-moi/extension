import fetch from 'isomorphic-fetch'
import { RECEIVED_MATCHING_CONTEXTS } from '../constants/ActionTypes';

const serverUrl = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8000/' : 'http://app-71135a26-848c-4d68-8f41-a8045a5aac11.cleverapps.io/';

function fetchAllMatchingContexts() {
    console.log('fetch');
    return fetch(serverUrl + 'api/v1/matchingcontexts').then(response => {
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