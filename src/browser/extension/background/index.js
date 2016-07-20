import configureStore from 'app/store/configureStore';
import createMenu from './contextMenus';
import initBadge from './badge';

import vAPI from './../../../vapi/chromeBackground'
import listener from './../../../app/listeners';
import AlternativesInjector from './../../../app/injector';
import { dispatchInitialStateFromBackend } from './../../../app/actions/kraftBackend';

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

import test from '../../../../test/integration/index.js';
window.integrationTest = test;

// Load content code when the extension is loaded
const contentCodeP = fetch('./js/content.bundle.js')
.then( resp => resp.text() );



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

  listener.init(vAPI, store);
  Promise.all([contentCodeP])
  .then( ([contentCode]) => new AlternativesInjector(vAPI, contentCode, mainStyles+recoStyles , store) );

  store.dispatch(dispatchInitialStateFromBackend()); //store initialization from the kraft server

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);
