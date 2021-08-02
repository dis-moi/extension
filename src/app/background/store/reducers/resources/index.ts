import { combineReducers } from 'redux';
import { Contributor } from 'libs/domain/contributor';
import { RestrictedContext } from 'libs/domain/matchingContext';
import { NoticeWithContributor } from 'libs/domain/notice';
import contributors from './contributors.reducer';
import matchingContexts, {
  MatchingContextsState
} from './matchingContexts.reducer';
import notices from './notices.reducer';
import restrictedContexts from './restrictedContexts.reducer';

export interface StateWithContributors {
  contributors: Contributor[];
}

export interface ResourcesState extends StateWithContributors {
  matchingContexts: MatchingContextsState;
  restrictedContexts: RestrictedContext[];
  notices: NoticeWithContributor[];
}

export default combineReducers({
  contributors,
  matchingContexts,
  notices,
  restrictedContexts
});
