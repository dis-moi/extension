import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';

import installationDetails from './installationDetails';
import open from './open';
import recommendations from './recommendations';
import tabId from './tabId';

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    open,
    recommendations,
    tabId,
    router: connectRouter(history)
  });
