import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

import fetch from 'isomorphic-fetch';
import {
  RECEIVED_MATCHING_CONTEXTS,
  RECEIVED_CRITERIA,
  RECEIVED_EDITORS
} from '../../constants/ActionTypes';

import { LMEM_BACKEND_ORIGIN } from '../../constants/origins';

function fetchJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    });
}

export function makeUrlFromFilters(criteria = [], excludedEditors = []) {
  let url = LMEM_BACKEND_ORIGIN + '/api/v2/matchingcontexts';
  const hasFilters = !(criteria.length === 0 && excludedEditors.length === 0);

  if (hasFilters){
    let filters = '';

    if (criteria.length !== 0 && excludedEditors.length === 0)
      filters = 'criteria=' + criteria.join(','); 
    else if (excludedEditors.length !== 0 && criteria.length === 0)
      filters = 'excluded_editors=' + excludedEditors.join(',');
    else
      filters = ['criteria=' + criteria.join(','), 'excluded_editors=' + excludedEditors.join(',')].join('&');

    console.log('filters', filters);

    url += '?' + filters;
  }

  return url;
}

function fetchMatchingContexts(criteria, excludedEditors) {
  return fetchJson(makeUrlFromFilters(criteria, excludedEditors));  
}

function fetchAllCriteria() {
  return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/criteria')
  .then(criteria => {
    // transform list of objects into ImmutableMap of ImmutableMaps
    return criteria.reduce((acc, criterion) => {
      return acc.set(criterion.slug, new ImmutableMap(criterion));
    }, new ImmutableMap());
  });
}

function fetchAllEditors() {
  return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/editors')
  .then(editors => {
    // transform list of objects into ImmutableMap of ImmutableMaps
    return editors.reduce((acc, editor) => {
      return acc.set(editor.id.toString(), new ImmutableMap(editor));
    }, new ImmutableMap());
  });
}

export function receivedMatchingContexts(matchingContexts) {
  return {
    type: RECEIVED_MATCHING_CONTEXTS,
    matchingContexts: new ImmutableSet(matchingContexts)
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
    fetchAllCriteria().then(ImmMap => dispatch(receivedCriteria(ImmMap)));
    fetchAllEditors().then(ImmMap => dispatch(receivedEditors(ImmMap)));
  };
}

export function refreshMatchingContextsFromBackend(criteria, editors) {
  return dispatch => {
    fetchMatchingContexts(criteria, editors).then(json => dispatch(receivedMatchingContexts(json)));
  };
}
