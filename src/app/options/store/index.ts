import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import rootReducer from './reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas';

export const history = createHashHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(history), sagaMiddleware];

const applyMiddlewares =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default(),
          require('redux-logger').createLogger({
            level: 'info',
            collapsed: true
          })
        ])
      )
    : applyMiddleware(...middlewares);

/* eslint-disable @typescript-eslint/no-explicit-any */
const addReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any): any => f;

const enhancer = compose(
  applyMiddlewares,
  addReduxDevTools
);

const store = createStore(rootReducer(history), enhancer);

sagaMiddleware.run(rootSaga);

export default store;
