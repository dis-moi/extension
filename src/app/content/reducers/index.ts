import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { MemoryHistory } from 'history';
import { reducer as form } from 'redux-form';

import installationDetails from 'app/background/reducers/installationDetails';
import ui from './ui';
import notices from './notices';
import serviceMessage from './serviceMessage.reducer';
import contributors from '../../store/reducers/contributors.reducer';

export default (history: MemoryHistory) =>
  combineReducers({
    installationDetails,
    ui,
    notices,
    router: connectRouter(history),
    form,
    serviceMessage,
    contributors
  });
