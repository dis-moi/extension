import { Action, applyMiddleware, createStore } from 'redux';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { FormStateMap } from 'redux-form';
import createSagaMiddleware from '@redux-saga/core';
import { InstallationDetailsState } from 'app/background/reducers/installationDetails';
import rootReducer from './reducers';
import { UIState } from './reducers/ui';
import { NoticesState } from './reducers/notices';
import { ServiceMessageState } from './reducers/serviceMessage.reducer';
import rootSaga from './sagas';
import { ContributorsState } from 'app/store/reducers/contributors.reducer';

export const history = createMemoryHistory();

export interface StateWithServiceMessage {
  serviceMessage: ServiceMessageState;
}
export type ContentState = StateWithServiceMessage & {
  installationDetails: InstallationDetailsState;
  ui: UIState;
  notices: NoticesState;
  router: RouterState;
  form: FormStateMap;
  contributors: ContributorsState;
};

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
