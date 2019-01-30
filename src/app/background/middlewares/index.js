import thunk from 'redux-thunk';
import openOptionsPage from './openOptionsPage';
import sendFeedback from './sendFeedback';
import createTabsMiddleware from './tabs';
import analytics from './analytics';
import sagaMiddleware from './saga';
import track from '../../analytics/trackEvents';
import getCurrentTabs from '../services/getCurrentTabs';

export { sagaMiddleware };

export default [
  thunk,
  analytics({
    getCurrentTabs,
    track,
  }),
  openOptionsPage,
  sendFeedback,
  createTabsMiddleware(chrome.tabs),
  sagaMiddleware,
];