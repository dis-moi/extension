import { Contributor } from 'app/lmem/contributor';
import { BackgroundState } from '../reducers';

export const getMatchingContexts = (state: BackgroundState) =>
  state.resources.matchingContexts;

export const getDraftNotices = (state: BackgroundState) =>
  state.resources.drafts;

export const getContributors = (state: BackgroundState): Contributor[] =>
  state.resources.contributors;
