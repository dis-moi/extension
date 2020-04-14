import { AppAction, UPDATE_MATCHING_CONTEXTS } from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';

export type MatchingContexts = MatchingContext[];

export const initialState: MatchingContexts = [];

export default (state: MatchingContexts = initialState, action: AppAction) => {
  switch (action.type) {
    case UPDATE_MATCHING_CONTEXTS:
      return action.payload;

    default:
      return state;
  }
};
