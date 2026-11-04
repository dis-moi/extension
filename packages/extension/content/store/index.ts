import { Action, applyMiddleware, createStore, Middleware } from 'redux';
import { routerMiddleware } from 'libs/store/router';
import { createMemoryHistory } from 'history';
import createSagaMiddleware from '@redux-saga/core';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

export const history = createMemoryHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        routerMiddleware(history),
        ...middlewares.concat([
          immutableStateInvariant(),
          createLogger({
            level: 'info',
            collapsed: true,
            titleFormatter: (
              action: Action,
              time: string,
              took: number,
            ): string =>
              `[CONTENT] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`,
          }),
        ]),
      )
    : applyMiddleware(routerMiddleware(history), ...middlewares);

const store = createStore(rootReducer(history), enhancer);

sagaMiddleware.run(rootSaga);

export default store;
