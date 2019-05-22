import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import rootReducer from './reducers';
import middlewares, { sagaMiddleware } from './middlewares';
import rootSaga from './sagas';
import { InstallationDetailsState } from './reducers/installationDetails';
import { UIState } from './reducers/ui';
import { NoticesState } from './reducers/notices';
import { PersistedState } from 'redux-persist/es/types';
import { TabIdState } from './reducers/tabId';
export const history = createMemoryHistory();

export interface State extends PersistedState {
  installationDetails: InstallationDetailsState;
  ui: UIState;
  notices: NoticesState;
  tabId: TabIdState;
  router: RouterState;
}

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
