/* eslint global-require: "off" */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import notify from 'redux-notify';
import rootReducer from '../reducers';
import trackEvents from '../analytics/middleware';
import makeInitialState from './makeInitialState';

export default function configureStore(callback, isBg) {
  let getState;
  if (isBg === undefined) getState = require('./getStoredState'); /* If you don't want to persist states, use './getDefaultState' */// eslint-disable-line max-len
  else getState = (isBg ? require('./getStateToBg') : require('./getStateFromBg'));

  getState(initialState => {
    if(Object.keys(initialState).length === 0){
      initialState = makeInitialState();
    }

    let enhancer;
    const middleware = [
      thunk,
      window.heap ? trackEvents : undefined
    ];

    if (process.env.NODE_ENV !== 'production') {
      middleware.push(
        require('redux-immutable-state-invariant')(),
        require('redux-logger')({ level: 'info', collapsed: true })
      );
      enhancer = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      );
    } else {
      enhancer = applyMiddleware(...middleware);
    }

    const store = createStore(rootReducer, initialState, enhancer);

    if (process.env.NODE_ENV !== 'production') {
      if (module.hot) {
        module.hot.accept('../reducers', () =>
          store.replaceReducer(require('../reducers'))
        );
      }
    }

    return store;
  }, callback);
}
