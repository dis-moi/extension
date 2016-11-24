import fetch from 'isomorphic-fetch';
import {
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  RECEIVED_EDITORS
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

function fetchMatchingContexts(criteria = undefined, excludedEditors = undefined) {

  let url = LMEM_BACKEND_ORIGIN + '/api/v2/matchingcontexts';
  let hasFilters = (criteria === undefined || criteria.length === 0) &&
    (excludedEditors === undefined || excludedEditors.length === 0);

  if (!hasFilters){
    let criteriaStr = '';
    let editorStr = '';

    if (criteria !== undefined || criteria.length !== 0)
      criteriaStr = 'criteria=' + criteria.join(','); 

    if (excludedEditors !== undefined || excludedEditors.length !== 0)
      editorStr = 'excluded_editors=' + excludedEditors.join(',');

    const filters = [criteriaStr, editorStr].join('&');

    console.log('filters', filters);

    url += '?' + filters;
  }

  return fetchJson(url);
  
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

export function receivedEditors(editors) {
  return {
    type: RECEIVED_EDITORS,
    editors,
  };
}

export function dispatchInitialStateFromBackend() {
  return dispatch => {
    fetchMatchingContexts().then(json => dispatch(receivedMatchingContexts(json)));
    fetchAllCriteria().then(json => dispatch(receivedCriteria(json)));
    fetchAllEditors().then(json => dispatch(receivedEditors(json)));
  };
}

export function refreshMatchingContextsFromBackend(criteria, excludedEditors) {
  return dispatch => {
    fetchMatchingContexts(criteria, excludedEditors).then(json => dispatch(receivedMatchingContexts(json)));
  };
}
