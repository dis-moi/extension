import { MatchingContext } from 'app/lmem/matchingContext';
import { Level } from '../utils/Logger';
import { ContributorId } from '../lmem/contributor';

export const UPDATE_MATCHING_CONTEXTS = 'api/UPDATE_MATCHING_CONTEXTS';
export const receivedMatchingContexts = (
  contributorId: ContributorId,
  matchingContexts: MatchingContext[]
) => ({
  type: UPDATE_MATCHING_CONTEXTS as typeof UPDATE_MATCHING_CONTEXTS,
  payload: { contributorId, matchingContexts }
});
export type ReceivedMatchingContextsAction = ReturnType<
  typeof receivedMatchingContexts
>;

export const REFRESH_MATCHING_CONTEXTS_FAILED =
  'REFRESH_MATCHING_CONTEXTS_FAILED';

export const refreshMatchingContextsFailed = (e: Error) => ({
  type: REFRESH_MATCHING_CONTEXTS_FAILED as typeof REFRESH_MATCHING_CONTEXTS_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.WARN }
});
export type RefreshMatchingContextsFailedAction = ReturnType<
  typeof refreshMatchingContextsFailed
>;
