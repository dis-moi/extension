import { MatchingContext } from 'app/lmem/matchingContext';
import { BaseAction, ErrorAction } from '.';
import { Level } from '../utils/Logger';

export const UPDATE_MATCHING_CONTEXTS = 'api/UPDATE_MATCHING_CONTEXTS';
export interface ReceivedMatchingContextsAction extends BaseAction {
  type: typeof UPDATE_MATCHING_CONTEXTS;
  payload: { matchingContexts: MatchingContext[] };
}
export const receivedMatchingContexts = (
  matchingContexts: MatchingContext[]
): ReceivedMatchingContextsAction => ({
  type: UPDATE_MATCHING_CONTEXTS,
  payload: { matchingContexts }
});

export const REFRESH_MATCHING_CONTEXTS_FAILED =
  'REFRESH_MATCHING_CONTEXTS_FAILED';
export interface RefreshMatchingContextsFailedAction extends ErrorAction {
  type: typeof REFRESH_MATCHING_CONTEXTS_FAILED;
}
export const refreshMatchingContextsFailed = (
  e: Error
): RefreshMatchingContextsFailedAction => ({
  type: REFRESH_MATCHING_CONTEXTS_FAILED,
  payload: e,
  error: true,
  meta: { severity: Level.WARN }
});
