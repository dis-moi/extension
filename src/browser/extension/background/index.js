/* eslint global-require: "off" */

import configureStore from './../../../app/store/configureStore';
import createMenu from './contextMenus';
import initBadge from './badge';

import findMatchingOffersAccordingToPreferences
  from '../../../app/lmem/findMatchingOffersAccordingToPreferences';
import tabs from '../../../app/tabs/index.js';
import prepareDraftPreview from '../../../app/lmem/draft-preview/main.js';

import { dispatchInitialStateFromBackend } from '../../../app/actions/kraftBackend';
import updateDraftRecommandations from '../../../app/actions/updateDraftRecommandations';

import heap from './../../../lib/heap';
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
import recoStyles from './../../../app/styles/reco.scss';

// Load content code when the extension is loaded
const contentCodeP = fetch('./js/content.bundle.js').then(resp => resp.text());
const draftRecoContentCodeP = fetch('./js/grabDraftRecommandations.js').then(resp => resp.text());

configureStore(store => {
  window.store = store;
  // Expose the store to extension's windows
  window.getStore = () => {
    let unsubscribeList = [];
    return {
      store: {
        ...store,
        subscribe(...args) {
          const unsubscribe = store.subscribe(...args);
          unsubscribeList.push(unsubscribe);
          return unsubscribe;
        }
      },
      unsubscribe: () => {
        unsubscribeList.forEach(unsubscriber => { unsubscriber(); });
      }
    };
  };

  contentCodeP
  .then(contentCode => {
    tabs(chrome.tabs, {
      findMatchingOffers: url => {
        const state = store.getState();
        
        return findMatchingOffersAccordingToPreferences(
          url, state.offers, state.draftRecommandations || [], state.preferences
        );
      },
      getDeactivatedWebsites: () => {
        const state = store.getState();
        const prefs = state.preferences || {};
        const deactivated = prefs.deactivated || {};
        return deactivated.deactivatedWebsites || new Set();
      },
      dispatch: store.dispatch,
      contentCode,
      contentStyle: mainStyles + recoStyles
    }
    );
  });

  draftRecoContentCodeP
  .then(contentCode => prepareDraftPreview(
      chrome.tabs, 
      contentCode,
      (draftOffers => store.dispatch(updateDraftRecommandations(draftOffers)))
    )
  );

  store.dispatch(dispatchInitialStateFromBackend()); // store initialization from the kraft server

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);
