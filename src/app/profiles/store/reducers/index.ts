import { routerReducer } from 'connected-next-router';
import { combineReducers } from 'redux';
import categories, { CategoriesCollection } from './categories.reducer';
import connection, { ConnectionState } from './connection.reducer';
import contributors, {
  ContributorsCollectionState
} from './contributors.reducer';
import notices, { NoticesCollectionState } from './notices.reducer';
import subscriptions, {
  SubscriptionsCollectionState
} from './subscriptions.reducer';
import { RouterState } from 'connected-react-router';

export default () => {
  return combineReducers({
    router: routerReducer,
    categories,
    connection,
    contributors,
    subscriptions,
    notices
  });
};

export interface ProfilesState extends RouterState {
  connection: ConnectionState;
  contributors: ContributorsCollectionState;
  subscriptions: SubscriptionsCollectionState;
  notices: NoticesCollectionState;
  categories: CategoriesCollection;
}
