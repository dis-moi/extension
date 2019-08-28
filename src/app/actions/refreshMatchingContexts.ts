import { MatchingContext } from 'app/lmem/matchingContext';
import { BaseAction, ErrorAction } from '.';

export interface ReceivedMatchingContextsAction extends BaseAction {
  type: 'api/UPDATE_MATCHING_CONTEXTS';
  payload: { matchingContexts: MatchingContext[] };
}
export const receivedMatchingContexts = (
  matchingContexts: MatchingContext[]
): ReceivedMatchingContextsAction => ({
  type: 'api/UPDATE_MATCHING_CONTEXTS',
  payload: { matchingContexts },
  meta: { tracked: false }
});

export interface RefreshMatchingContextsFailedAction extends ErrorAction {
  type: 'REFRESH_MATCHING_CONTEXTS_FAILED';
}
export const refreshMatchingContextsFailed = (
  e: Error
): RefreshMatchingContextsFailedAction => ({
  type: 'REFRESH_MATCHING_CONTEXTS_FAILED',
  payload: e,
  error: true
});
