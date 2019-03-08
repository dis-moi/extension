import { applyMiddleware, createStore, } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import { Record, Map as ImmutableMap } from 'immutable';
import rootReducer from './reducers';
import middlewares, { sagaMiddleware } from './middlewares';
import rootSaga from './sagas';

export const history = createMemoryHistory();

const enhancer = process.env.NODE_ENV !== 'production'
  ? applyMiddleware(routerMiddleware(history), ...middlewares.concat([
        require('redux-immutable-state-invariant').default(), // eslint-disable-line
        require('redux-logger').createLogger({ // eslint-disable-line
      level: 'info',
      collapsed: true,
      stateTransformer: state => state.toJS()
    }),
  ]))
  : applyMiddleware(routerMiddleware(history), ...middlewares);

const store = createStore(
  rootReducer(history),
  new Record({
    open: false,
    reduced: true,
    preferenceScreenPanel: null, // preference screen close
    recommendations: [],
    onInstalledDetails: new ImmutableMap(),
    criteria: new ImmutableMap(),
    editors: new ImmutableMap(),
    router: new ImmutableMap()
  })(),
  enhancer
);

sagaMiddleware.run(rootSaga);

export default store;
