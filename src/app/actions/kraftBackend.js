import fetch from 'isomorphic-fetch';
import {
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  SELECTED_CRITERIA,
  RECEIVED_EDITORS,
  EXCLUDED_EDITORS
} from '../constants/ActionTypes';

import { LMEM_BACKEND_ORIGIN } from '../constants/origins';

function fetchJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

function fetchAllMatchingContexts() {
  // FIXME make up the request with selected criteria and excluded editors
  return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/matchingcontexts');
}

function fetchAllCriteria() {
  // TODO wait for https://github.com/insitu-project/kraft-backend/pull/79
  // return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/criteria');
  return new Promise(resolve => resolve([
    { slug: 'price', label: 'Prix' },
    { slug: 'quality', label: 'Qualité' },
  ]));
}

function fetchAllEditors() {
  // TODO wait for https://github.com/insitu-project/kraft-backend/pull/80
  // return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/editors');
  return new Promise(resolve => resolve([
    { id: 42, url: 'choisir.lmem.net', label: 'LMEM' },
    { id: 24, url: 'quechoisir.fr', label: 'Que Choisir' },
  ]));
}

function fetchSelectedCriteria() {
  return new Promise(resolve => resolve(['price', 'quality']));
}

function fetchExcludedEditors() {
  return new Promise(resolve => resolve([]));
}

export function receivedMatchingContexts(matchingContexts) {
  return {
    type: RECEIVED_MATCHING_CONTEXTS,
    matchingContexts
  };
}

export function receivedCriteria(criteria) {
  return {
    type: RECEIVED_CRITERIA,
    criteria,
  };
}

export function selectedCriteria(criteria) {
  return {
    type: SELECTED_CRITERIA,
    criteria,
  };
}

export function receivedEditors(editors) {
  return {
    type: RECEIVED_EDITORS,
    editors,
  };
}

export function excludedEditors(editors) {
  return {
    type: EXCLUDED_EDITORS,
    editors,
  };
}

export function dispatchInitialStateFromBackend() {
  return dispatch => {
    fetchAllMatchingContexts().then(json => dispatch(receivedMatchingContexts(json)));
    fetchAllCriteria().then(json => dispatch(receivedCriteria(json)));
    fetchSelectedCriteria().then(json => dispatch(selectedCriteria(json)));
    fetchAllEditors().then(json => dispatch(receivedEditors(json)));
    fetchExcludedEditors().then(json => dispatch(excludedEditors(json)));
  };
}
