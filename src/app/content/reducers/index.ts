import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';
import { reducer as form } from 'redux-form';

import installationDetails from 'app/background/reducers/installationDetails';
import ui from './ui';
import notices from './notices';
import tab from './tab';
import serviceMessage from './serviceMessage.reducer';
import contributors from './contributors.reducer';

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    ui,
    notices,
    tab,
    router: connectRouter(history),
    form,
    serviceMessage,
    contributors
  });
