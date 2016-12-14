/* eslint global-require: "off" */

// Early imports with high priority stuff involved, such as event listeners creation
import onInstalled from '../../../app/actions/install';
import loadHeap from '../../../lib/heap';

import configureStore from './../../../app/store/configureStore';

import findMatchingOffersAccordingToPreferences
  from '../../../app/lmem/findMatchingOffersAccordingToPreferences';
import getMatchingRecommendations from '../../../app/lmem/getMatchingRecommendations';
import tabs from '../../../app/tabs/index.js';
import prepareDraftPreview from '../../../app/lmem/draft-preview/main.js';

import { dispatchInitialStateFromBackend, refreshMatchingContextsFromBackend } from '../../../app/actions/kraftBackend';
import updateDraftRecommendations from '../../../app/actions/updateDraftRecommendations';

import {LMEM_BACKEND_ORIGIN, LMEM_SCRIPTS_ORIGIN} from '../../../app/constants/origins';

/**
 * FIXME import styles from components instead and let Webpack taking care of them...
 *
 * For now, we’re basically importing a plain-text chunk of css, merely generated
 * from SASS files, before injecting it into a <style> element somewhere in
 * into the iframe’s <head>...
 *
 * It does its job, but comes with performance issue (since Browsers cannot cache
 * those styles) and maintainability issue (gap between React and Sass sort of
 * components, error prone assets references, etc.)
 */
import mainStyles from './../../../app/styles/main.scss';

if(process.env.NODE_ENV !== 'production'){
  console.info('NODE_ENV', process.env.NODE_ENV);
}
console.info(`LMEM_BACKEND_ORIGIN "${LMEM_BACKEND_ORIGIN}"`);
console.info(`LMEM_SCRIPTS_ORIGIN "${LMEM_SCRIPTS_ORIGIN}"`);

const heapAppId = process.env.HEAP_APPID;
if (typeof heapAppId === 'string') {
  console.info(`Heap loading with appId "${heapAppId}"`);
  loadHeap(heapAppId);
}
else {
  console.warn('Heap analytics disabled: assuming "process.env.HEAP_APPID" is deliberately not defined.');
}

// Load content code when the extension is loaded
const contentCodeP = fetch(LMEM_SCRIPTS_ORIGIN + '/js/content.bundle.js').then(resp => resp.text());
const draftRecoContentCodeP = fetch(LMEM_SCRIPTS_ORIGIN + '/js/grabDraftRecommendations.js').then(resp => resp.text());

configureStore(store => {
  window.store = store;
  // Expose the store to extension's windows
  window.getStore = () => {
    let unsubscribeList = [];
    return {
      store: Object.assign({
        subscribe(...args) {
          const unsubscribe = store.subscribe(...args);
          unsubscribeList.push(unsubscribe);
          return unsubscribe;
        },
        store
      }),
      unsubscribe: () => {
        unsubscribeList.forEach(unsubscriber => { unsubscriber(); });
      }
    };
  };

  contentCodeP
  .then(contentCode => {
    tabs(chrome.tabs, {
      findTriggeredContexts: url => {
        const state = store.getState();
        
        return findMatchingOffersAccordingToPreferences(
          url, state.matchingContexts, state.draftRecommendations || [], state.preferences
        );
      },
      getMatchingRecommendations,
      getDeactivatedWebsites: () => {
        const state = store.getState();
        const prefs = state.preferences || {};
        const deactivated = prefs.deactivated || {};
        return deactivated.deactivatedWebsites || new Set();
      },
      getOnInstalledDetails: () => {
        const state = store.getState();
        return state.onInstalledDetails || {};
      },
      getCriteria: () => store.getState().criteria || new Map(),
      getEditors: () => store.getState().editors || new Map(),
      getDismissed: () => store.getState().dismissedRecos || new Set(),
      dispatch: store.dispatch,
      contentCode,
      refreshMatchingContexts: () => {
        const state = store.getState();

        let selectedCriteria = Array.from(state.criteria.keys())
        .filter(slug => {
          return state.criteria.get(slug).get('isSelected');  
        });

        let excludedEditors = Array.from(state.editors.keys())
        .filter(id => {
          return state.editors.get(id).get('isExcluded');
        });

        store.dispatch(refreshMatchingContextsFromBackend(selectedCriteria, excludedEditors));
      },
      contentStyle: mainStyles
    });
  });

  draftRecoContentCodeP
  .then(contentCode => prepareDraftPreview(
      chrome.tabs, 
      contentCode,
      (draftOffers => store.dispatch(updateDraftRecommendations(draftOffers)))
    )
  );

  if (!store.getState().onInstalledDetails) {
    store.dispatch(onInstalled());
  }

  store.dispatch(dispatchInitialStateFromBackend()); // store initialization from the kraft server

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);
