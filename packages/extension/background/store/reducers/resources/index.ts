import { combineReducers } from 'redux';
import { Contributor } from '@dismoi/domain/contributor';
import { RestrictedContext } from '@dismoi/domain/matchingContext';
import { NoticeWithContributor } from '@dismoi/domain/notice';
import contributors from './contributors.reducer';
import matchingContexts, {
  MatchingContextsState,
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
  restrictedContexts,
});
