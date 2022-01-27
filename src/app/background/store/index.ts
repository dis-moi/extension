import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import createBrowserStorage from 'libs/webext/createBrowserStorage';
import { AppAction } from 'libs/store/actions';
import rootReducer, { BackgroundState } from './reducers';
import middlewares, { sagaMiddleware } from './middlewares';
import rootSaga from './sagas';
import migrate from './migrations';

export const persistConfig = {
  key: 'root',
  whitelist: [
    'prefs',
    'subscriptions',
    'installationDetails',
    'user',
    'serviceMessage'
  ],
  version: 3,
  migrate,
  stateReconciler: autoMergeLevel2
};

const persistedReducers = persistReducer(
  {
    ...persistConfig,
    storage: createBrowserStorage('sync')
  },
  rootReducer
);

const enhancer =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default()
        ])
      )
    : applyMiddleware(...middlewares);

export const store = createStore<BackgroundState, AppAction, null, null>(
  // eslint-disable-next-line
  // @ts-ignore
  persistedReducers,
  enhancer
);
persistStore(store);

sagaMiddleware.run(rootSaga);
