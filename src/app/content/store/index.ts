import { Action, applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import createSagaMiddleware from '@redux-saga/core';
import rootReducer from './reducers';
import rootSaga from './sagas';

export const history = createMemoryHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        routerMiddleware(history),
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default(),
          require('redux-logger').createLogger({
            level: 'info',
            collapsed: true,
            titleFormatter: (
              action: Action,
              time: string,
              took: number
            ): string =>
              `[CONTENT] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`
          })
        ])
      )
    : applyMiddleware(routerMiddleware(history), ...middlewares);

const store = createStore(rootReducer(history), enhancer);

sagaMiddleware.run(rootSaga);

export default store;
