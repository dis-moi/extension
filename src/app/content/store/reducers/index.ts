import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';
import { FormStateMap, reducer as form } from 'redux-form';

import installationDetails, {
  InstallationDetailsState
} from 'libs/store/reducers/installationDetails';
import contributors, {
  ContributorsState
} from 'libs/store/reducers/contributors.reducer';
import ui, { UIState } from './ui';
import notices, { NoticesState } from './notices';
import serviceMessage, { ServiceMessageState } from './serviceMessage.reducer';
import news, { NewsState } from './news.reducer';

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
  news: NewsState;
};

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    ui,
    notices,
    router: connectRouter(history),
    form,
    serviceMessage,
    contributors,
    news
  });
