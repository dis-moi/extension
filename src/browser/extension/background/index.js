import configureStore from 'app/store/configureStore';
import createMenu from './contextMenus';
import initBadge from './badge';

import vAPI from './../../../vapi/chromeBackground'
import listener from './../../../app/listeners';
import injector from './../../../app/injector';
import { dispatchInitialStateFromBackend } from './../../../app/actions/kraftBackend';

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
  injector.init(vAPI, store);

  store.dispatch(dispatchInitialStateFromBackend()); //store initialization from the kraft server
  
  if (process.env.NODE_ENV !== 'production') {
    require('./inject');
  }
}, true);
