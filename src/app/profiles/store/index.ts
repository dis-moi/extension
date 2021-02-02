import { Action, applyMiddleware, compose, createStore } from 'redux';
import rootReducer from 'app/profiles/store/reducers';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from 'app/profiles/store/sagas';
import {
  createRouterMiddleware,
  initialRouterState
} from 'connected-next-router';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { Router } from 'next/router';

const applyMiddlewares = (sagaMiddleware: any, routerMiddleware: any) => {
  const middlewares = [routerMiddleware, sagaMiddleware];

  return process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default()
          // require('redux-logger').createLogger({
          //   level: 'info',
          //   collapsed: true,
          //   titleFormatter: (
          //     action: Action,
          //     time: string,
          //     took: number
          //   ): string =>
          //     `[PROFILES] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`
          // })
        ])
      )
    : applyMiddleware(...middlewares);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const addReduxDevTools =
  typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: any): any => f;

// Using next-redux-wrapper's initStore
const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return rootReducer()(state, action);
  }
};

export const initStore = (context: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware();

  const { asPath } = context.ctx || (Router as any).router || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath)
    };
  }
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddlewares(sagaMiddleware, routerMiddleware),
      addReduxDevTools
    )
  );

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const dateStripped = (obj: any) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (value !== null) {
      // If array, loop...
      if (Array.isArray(value)) {
        value = value.map(item => dateStripped(item));
      }
      // ...if property is date/time, stringify/parse...
      else if (
        typeof value === 'object' &&
        typeof value.getMonth === 'function'
      ) {
        value = JSON.parse(JSON.stringify(value));
      }
      // ...and if a deep object, loop.
      else if (typeof value === 'object') {
        value = dateStripped(value);
      }
    }
    (newObj as any)[key] = value;
  });
  return newObj;
};

export const wrapper = createWrapper(initStore, {
  serializeState: state => dateStripped(state),
  deserializeState: state => state
});
