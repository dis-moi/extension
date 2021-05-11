import { combineReducers } from 'redux';
import { Contributor } from 'app/lmem/contributor';
import { RestrictedContext } from 'app/lmem/matchingContext';
import { NoticeWithContributor } from 'app/lmem/notice';
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
