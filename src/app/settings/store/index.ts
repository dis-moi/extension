import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import rootReducer from './reducers';
import middlewares from './middlewares';

export const history = createMemoryHistory();

const enhancer =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        routerMiddleware(history),
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default(),
          require('redux-logger').createLogger({
            level: 'info',
            collapsed: true
          })
        ])
      )
    : applyMiddleware(routerMiddleware(history));

const store = createStore(rootReducer(history), enhancer);

export default store;
