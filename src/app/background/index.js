/* eslint global-require: "off" */
import { Map as ImmutableMap, Set as ImmutableSet } from 'immutable';

// Early imports with high priority stuff involved, such as event listeners creation
import onInstalled from './actions/install';
import loadHeap from '../../lib/heap';

import configureStore from './store/configureStore';

import findMatchingOffersAccordingToPreferences
  from '../lmem/findMatchingOffersAccordingToPreferences';
import getMatchingRecommendations from '../lmem/getMatchingRecommendations';
import { makeTabs } from './tabs.js';
import prepareDraftPreview from '../lmem/draft-preview/main.js';

import {
  dispatchInitialStateFromBackend,
  refreshMatchingContextsFromLegacy,
} from './actions/kraftBackend';
import updateDraftRecommendations from './actions/updateDraftRecommendations';

import { OPEN_PREFERENCE_PANEL } from '../constants/ActionTypes';
import {LMEM_BACKEND_ORIGIN, LMEM_SCRIPTS_ORIGIN} from '../constants/origins';

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
import mainStyles from '../styles/main.scss';

if(process.env.NODE_ENV !== 'production'){
  console.info('NODE_ENV', process.env.NODE_ENV);
}
console.info(`LMEM_BACKEND_ORIGIN "${LMEM_BACKEND_ORIGIN}"`);
console.info(`LMEM_SCRIPTS_ORIGIN "${LMEM_SCRIPTS_ORIGIN}"`);

const heapAppId = process.env.HEAP_APPID;
if (typeof heapAppId === 'string') {
  console.info(`Heap loading with appId "${heapAppId}"`);
  loadHeap(heapAppId).then(heap => {
    const uninstallOrigin = process.env.UNINSTALL_ORIGIN;
    if (typeof uninstallOrigin === 'string') {
      chrome.runtime.setUninstallURL(uninstallOrigin + '?u=' + encodeURIComponent(heap.userId));
    }
  });
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
    makeTabs(chrome.tabs, {
      findTriggeredContexts: url => {
        const state = store.getState();
        
        return findMatchingOffersAccordingToPreferences(
          url,
          state.get('resources').get('matchingContexts').toJS(),
          state.get('resources').get('draftRecommendations').toJS() || [],
          state.get('prefs').get('websites')
        );
      },
      getMatchingRecommendations,
      getOnInstalledDetails: () => store.getState().get('prefs').get('onInstalledDetails') || new ImmutableMap(),
      getCriteria: () => store.getState().get('prefs').get('criteria') || new ImmutableMap(),
      getEditors: () => store.getState().get('prefs').get('editors') || new ImmutableMap(),
      getDismissed: () => store.getState().get('prefs').get('dismissedRecos') || new ImmutableSet(),
      getApproved: () => store.getState().get('prefs').get('approvedRecos') || new ImmutableSet(),
      dispatch: store.dispatch,
      contentCode,
      contentStyle: mainStyles.toString()
    });
  });

  draftRecoContentCodeP
  .then(contentCode => prepareDraftPreview(
      chrome.tabs, 
      contentCode,
      (draftOffers => store.dispatch(updateDraftRecommendations(draftOffers)))
    )
  );

  if (store.getState().get('prefs').get('onInstalledDetails').isEmpty()) {
    const onboardingUrl = process.env.ONBOARDING_ORIGIN;
    store.dispatch(onInstalled({ onboardingUrl }));
  }

  store.dispatch(dispatchInitialStateFromBackend()); // store initialization from the kraft server

  // Legacy extension use only...
  // TODO: remove with the legacy extension...
  store.dispatch(refreshMatchingContextsFromLegacy()); // watch for refresh request from the legacy extension

  chrome.browserAction.onClicked.addListener(() => {
    store.dispatch({ type: OPEN_PREFERENCE_PANEL });
  });

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);

