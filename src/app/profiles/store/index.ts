import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware
} from 'redux';
import { routerMiddleware } from 'libs/store/router';
import createSagaMiddleware from '@redux-saga/core';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { History } from 'history';
import rootReducer from './reducers';
import rootSaga from './sagas';

export const createProfilesStore = (history?: History) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    history && routerMiddleware(history),
    sagaMiddleware,
    createLogger({
      level: 'info',
      collapsed: true,
      titleFormatter: (action: Action, time: string, took: number): string =>
        `[PROFILES] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`
    })
  ].filter(Boolean) as Middleware[];

  const applyMiddlewares =
    process.env.NODE_ENV !== 'production'
      ? applyMiddleware(...middlewares.concat([immutableStateInvariant()]))
      : applyMiddleware(...middlewares);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const addReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: any): any => f;

  const enhancer = compose(applyMiddlewares, addReduxDevTools);

  const store = createStore(rootReducer(history), enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
};
