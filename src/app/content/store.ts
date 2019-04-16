import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import rootReducer from './reducers';
import middlewares, { sagaMiddleware } from './middlewares';
import rootSaga from './sagas';
import { InstallationDetailsState } from './reducers/installationDetails';
import { OpenState } from './reducers/open';
import { NoticesState } from './reducers/recommendations';
import { PersistedState } from 'redux-persist/es/types';
import { TabIdState } from './reducers/tabId';
export const history = createMemoryHistory();

export interface State extends PersistedState {
  installationDetails: InstallationDetailsState;
  open: OpenState;
  recommendations: NoticesState;
  tabId: TabIdState;
  router: RouterState;
}

const enhancer =
  process.env.NODE_ENV !== 'production'
    ? applyMiddleware(
        routerMiddleware(history),
        ...middlewares.concat([
          require('redux-immutable-state-invariant').default(), // eslint-disable-line
          require('redux-logger').createLogger({
            // eslint-disable-line
            level: 'info',
            collapsed: true
          })
        ])
      )
    : applyMiddleware(routerMiddleware(history), ...middlewares);

const store = createStore(rootReducer(history), enhancer);

sagaMiddleware.run(rootSaga);

export default store;
