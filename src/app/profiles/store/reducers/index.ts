import { connectRouter, RouterRootState } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import contributors, {
  ContributorsCollectionState
} from './contributors.reducer';
import matchingContexts, {
  MatchingContextsCollectionState
} from './matchingContexts.reducer';
import subscriptions, {
  SubscriptionsState
} from 'app/background/reducers/subscriptions.reducer';
import notices, { NoticesCollectionState } from './notices.reducer';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    contributors,
    matchingContexts,
    subscriptions,
    notices
  });

export interface ProfilesState extends RouterRootState {
  contributors: ContributorsCollectionState;
  matchingContexts: MatchingContextsCollectionState;
  subscriptions: SubscriptionsState;
  notices: NoticesCollectionState;
}
