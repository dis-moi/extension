/* eslint-disable */
'use strict';

/*
  This is a relative URL as the request is intended to be same-origin.
*/
const PRIVATE_RECOS_ENDPOINT = '/api/v3/admin/matchingcontexts/private'; //TODO V3 matching-contexts/private ?

chrome.runtime.onConnect.addListener(function listener(portToBackground) {
  fetch(PRIVATE_RECOS_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
    .then(resp => {
      if (resp.status >= 400) throw new Error('HTTP status ' + resp.status);

      return resp.json();
    })
    .then(privateRecos => portToBackground.postMessage(privateRecos))
    .catch(err => console.error('Private reco error', err));
});
