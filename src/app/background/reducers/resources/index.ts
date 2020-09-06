import { combineReducers } from 'redux';
import contributors from './contributors.reducer';
import matchingContexts from './matchingContexts.reducer';
import notices from './notices.reducer';
import restrictedContexts from './restrictedContexts.reducer';
import { Contributor } from 'app/lmem/contributor';
import { MatchingContext, RestrictedContext } from 'app/lmem/matchingContext';
import { NoticeWithContributor } from 'app/lmem/notice';

export interface StateWithContributors {
  contributors: Contributor[];
}

export interface ResourcesState extends StateWithContributors {
  matchingContexts: MatchingContext[];
  restrictedContexts: RestrictedContext[];
  notices: NoticeWithContributor[];
}

export default combineReducers({
  contributors,
  matchingContexts,
  notices,
  restrictedContexts
});
