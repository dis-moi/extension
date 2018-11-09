/* eslint global-require: "off" */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import analytics from '../middlewares/analytics';
import trackEvents from '../../analytics/trackEvents';
import refreshMatchingContexts from '../middlewares/refreshMatchingContexts';
import openOptionsPage from '../middlewares/openOptionsPage';
import sendFeedback from '../middlewares/sendFeedback';
import fromJS from '../../utils/customFromJS';

import makeInitialState from './makeInitialState';

import migrate from './migrations';

export default function configureStore(callback, isBg) {
  let getState;
  // @todo I don't get this condition
  if (isBg === undefined) {
    /* If you don't want to persist states, use './getDefaultState' */
    getState = require('./getStoredState').default;
  } else {
    getState = isBg ? require('./getStateToBg').default : require('./getStateFromBg').default;
  }

  const trackEventMiddleware = analytics({
    getCurrentTabs: () => new Promise(resolve => chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => resolve(tabs),
    )),
    track: trackEvents,
  });

  getState((loadedState) => {
    // let enhancer;
    const middlewares = [
      thunk,
      trackEventMiddleware,
      refreshMatchingContexts,
      openOptionsPage,
      sendFeedback
    ];

    const composeEnhancers = composeWithDevTools({
      // options
    });

    const enhancer = process.env.NODE_ENV !== 'production'
      ? composeEnhancers(applyMiddleware(...middlewares.concat([
        require('redux-immutable-state-invariant').default(), // eslint-disable-line
        require('redux-logger').createLogger({ level: 'info', collapsed: true }), // eslint-disable-line
      ])))
      : applyMiddleware(...middlewares);


    const initialPrefState = makeInitialState().delete('resources'); // Map
    const initialResourcesState = makeInitialState().delete('prefs'); // Map
    
    // migrate loadedState to the current state structure
    const migratedState = migrate(fromJS(loadedState), initialPrefState);
    
    const state = initialResourcesState.merge(migratedState);
    const store = createStore(rootReducer, state, enhancer);

    // FIXME
    // if (process.env.NODE_ENV !== 'production') {
    //   if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //       store.replaceReducer(require('../reducers'))
    //     );
    //   }
    // }

    return store;
  }, callback);
}
