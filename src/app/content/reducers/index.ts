import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';

import installationDetails from './installationDetails';
import open from './open';
import notices from './notices';
import tabId from './tabId';

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    open,
    notices,
    tabId,
    router: connectRouter(history)
  });
