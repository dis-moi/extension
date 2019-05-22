import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';

import installationDetails from './installationDetails';
import ui from './ui';
import notices from './notices';
import tab from './tab';

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    ui,
    notices,
    tab,
    router: connectRouter(history)
  });
