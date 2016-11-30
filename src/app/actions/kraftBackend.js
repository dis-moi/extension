import { Map as ImmutableMap } from 'immutable';

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
  // TODO wait for https://github.com/insitu-project/kraft-backend/pull/79
  // return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/criteria')
  // .then(criteria => {
  //   let newCriteria = new ImmutableMap();

  //   Object.keys(criteria).forEach(slug => {
  //     newCriteria = newCriteria.set(slug, new ImmutableMap(criteria[slug]))
  //   });

  //   return newCriteria;
  // });

  return new Promise(resolve => resolve(new ImmutableMap({
    'price': new ImmutableMap({ slug: 'price', label: 'Prix' }),
    'quality': new ImmutableMap({ slug: 'quality', label: 'Qualité' }),
  })));
}

function fetchAllEditors() {
  // TODO wait for https://github.com/insitu-project/kraft-backend/pull/80
  // return fetchJson(LMEM_BACKEND_ORIGIN + '/api/v2/editors')
  // .then(editors => {
  //   let newEditors = new ImmutableMap();

  //   Object.keys(editors).forEach(id => {
  //     newEditors = newEditors.set(id, new ImmutableMap(editors[id]))
  //   });

  //   return newEditors;
  // });

  return new Promise(resolve => resolve(new ImmutableMap({
    42: new ImmutableMap({ id: 42, url: 'choisir.lmem.net', label: 'LMEM' }),
    24: new ImmutableMap({ id: 24, url: 'quechoisir.fr', label: 'Que Choisir' }),
  })));
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

export function refreshMatchingContextsFromBackend(criteria, editors) {
  return dispatch => {
    fetchMatchingContexts(criteria, editors).then(json => dispatch(receivedMatchingContexts(json)));
  };
}
