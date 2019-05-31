import { BackgroundState } from '../reducers';

export const getMatchingContexts = (state: BackgroundState) =>
  state.resources.matchingContexts;

export const getDraftNotices = (state: BackgroundState) =>
  state.resources.drafts;
