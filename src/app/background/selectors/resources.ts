import { BackgroundState } from '../reducers';

export const getMatchingContexts = (state: BackgroundState) =>
  state.resources.matchingContexts;

export const getDrafRecommendations = (state: BackgroundState) =>
  state.resources.draftRecommendations;
