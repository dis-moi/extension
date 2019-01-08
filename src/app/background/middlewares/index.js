import thunk from 'redux-thunk';
import refreshMatchingContexts from './refreshMatchingContexts';
import openOptionsPage from './openOptionsPage';
import sendFeedback from './sendFeedback';
import createTabsMiddleware from './tabs';
import analytics from './analytics';
import track from '../../analytics/trackEvents';
import getCurrentTabs from '../services/getCurrentTabs';

export default [
  thunk,
  analytics({
    getCurrentTabs,
    track,
  }),
  refreshMatchingContexts,
  openOptionsPage,
  sendFeedback,
  createTabsMiddleware(chrome.tabs),
];