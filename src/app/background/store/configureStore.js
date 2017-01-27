/* eslint global-require: "off" */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import notify from 'redux-notify';
import rootReducer from '../reducers';
import trackEvents from '../middlewares/analytics';
import fromJS from '../../utils/customFromJS';

import checkState from './checkState';
import makeInitialState from './makeInitialState';

import history from './history.js';

export default function configureStore(callback, isBg) {
  let getState;
  if (isBg === undefined) getState = require('./getStoredState'); /* If you don't want to persist states, use './getDefaultState' */// eslint-disable-line max-len
  else getState = (isBg ? require('./getStateToBg') : require('./getStateFromBg'));

  getState(loadedState => {
    let enhancer;
    const middleware = [
      thunk,
      trackEvents
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

    const initialPrefState = makeInitialState().delete('notPrefs'); // Map
    const initialNotPrefState = makeInitialState().delete('prefs'); // Map

    const checkedState = checkState(initialPrefState, fromJS(loadedState), fromJS(history));

    const state = initialNotPrefState.merge(checkedState);
    const store = createStore(rootReducer, state, enhancer);

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
