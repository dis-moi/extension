import { applyMiddleware, createStore, } from 'redux';
import { Record, Map as ImmutableMap } from 'immutable';
import rootReducer from './reducers';
import middlewares, { sagaMiddleware } from './middlewares';
import rootSaga from './sagas';

const enhancer = process.env.NODE_ENV !== 'production'
  ? applyMiddleware(...middlewares.concat([
        require('redux-immutable-state-invariant').default(), // eslint-disable-line
        require('redux-logger').createLogger({ // eslint-disable-line
      level: 'info',
      collapsed: true,
      stateTransformer: state => state.toJS()
    }),
  ]))
  : applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  new Record({
    open: true,
    reduced: true,
    preferenceScreenPanel: undefined, // preference screen close
    recommendations: undefined,
    onInstalledDetails: new ImmutableMap(),
    criteria: new ImmutableMap(),
    editors: new ImmutableMap(),
  })(),
  enhancer
);

sagaMiddleware.run(rootSaga);

export default store;
