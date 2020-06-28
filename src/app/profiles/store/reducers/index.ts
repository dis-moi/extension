import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import connection, { ConnectionState } from './connection.reducer';
import contributors, {
  ContributorsCollectionState
} from './contributors.reducer';
import matchingContexts, {
  MatchingContextsCollectionState
} from './matchingContexts.reducer';

import notices, { NoticesCollectionState } from './notices.reducer';
import subscriptions, {
  SubscriptionsCollectionState
} from './subscriptions.reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    connection,
    contributors,
    matchingContexts,
    subscriptions,
    notices
  });

export interface ProfilesState extends RouterRootState {
  connection: ConnectionState;
  contributors: ContributorsCollectionState;
  matchingContexts: MatchingContextsCollectionState;
  subscriptions: SubscriptionsCollectionState;
  notices: NoticesCollectionState;
}
