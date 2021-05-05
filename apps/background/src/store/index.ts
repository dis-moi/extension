import { createStore, applyMiddleware, Action } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createBrowserStorage from 'libs/webext/createBrowserStorage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import rootReducer, { BackgroundState } from '../reducers';
import middlewares, { sagaMiddleware } from '../middlewares';
import rootSaga from '../sagas';
import migrate from './migrations';
import { AppAction } from 'src/app/actions';

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
          require('redux-immutable-state-invariant').default(),
          require('redux-logger').createLogger({
            level: 'info',
            collapsed: true,
            titleFormatter: (
              action: Action,
              time: string,
              took: number
            ): string =>
              `[BACKGROUND] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`
          })
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
