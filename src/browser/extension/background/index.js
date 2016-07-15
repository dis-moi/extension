import configureStore from 'app/store/configureStore';
import createMenu from './contextMenus';
import initBadge from './badge';

import vAPI from './../../../vapi/chromeBackground'
import listener from './../../../app/listeners';
import AlternativesInjector from './../../../app/injector';
import { dispatchInitialStateFromBackend } from './../../../app/actions/kraftBackend';

// Load content code when the extension is loaded
const contentCodeP = fetch('./js/content.bundle.js')
.then( resp => resp.text() )
const styleP = fetch('./styles/alt.css')
.then( resp => resp.text() )

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

  //createMenu();
  //initBadge(store.getState().counter.count);
  listener.init(vAPI, store);
  Promise.all([contentCodeP, styleP])
  .then( ([contentCode, style]) => new AlternativesInjector(vAPI, contentCode, style, store) );

  store.dispatch(dispatchInitialStateFromBackend()); //store initialization from the kraft server

  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);
