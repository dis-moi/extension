import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import categories, { CategoriesCollection } from './categories.reducer';
import connection, { ConnectionState } from './connection.reducer';
import contextPopin, { ContextPopinState } from './contextPopin.reducer';
import contributors, {
  ContributorsCollectionState
} from './contributors.reducer';
import notices, { NoticesCollectionState } from './notices.reducer';
import subscriptions, {
  SubscriptionsCollectionState
} from './subscriptions.reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    categories,
    connection,
    contributors,
    subscriptions,
    notices,
    contextPopin
  });

export interface ProfilesState extends RouterRootState {
  connection: ConnectionState;
  contributors: ContributorsCollectionState;
  subscriptions: SubscriptionsCollectionState;
  notices: NoticesCollectionState;
  categories: CategoriesCollection;
  contextPopin: ContextPopinState;
}
