import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { FormStateMap } from 'redux-form';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { InstallationDetailsState } from './reducers/installationDetails';
import { UIState } from './reducers/ui';
import { NoticesState } from './reducers/notices';
import { TabState } from './reducers/tab';
import createSagaMiddleware from '@redux-saga/core';

export const history = createMemoryHistory();

export interface ContentState {
  installationDetails: InstallationDetailsState;
  ui: UIState;
  notices: NoticesState;
  tab: TabState;
  router: RouterState;
  form: FormStateMap;
}

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
            collapsed: true
          })
        ])
      )
    : applyMiddleware(routerMiddleware(history), ...middlewares);

const store = createStore(rootReducer(history), enhancer);

sagaMiddleware.run(rootSaga);

export default store;
