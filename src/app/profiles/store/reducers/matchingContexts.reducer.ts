import createCollectionReducer, {
  CollectionState
} from 'app/store/collection/reducers';
import {
  REFRESH_MATCHING_CONTEXTS,
  REFRESH_MATCHING_CONTEXTS_FAILED,
  UPDATE_MATCHING_CONTEXTS
} from 'app/actions';
import { MatchingContext } from 'app/lmem/matchingContext';

export type MatchingContextsCollectionState = CollectionState<MatchingContext>;

export default createCollectionReducer<MatchingContext>(
  REFRESH_MATCHING_CONTEXTS,
  UPDATE_MATCHING_CONTEXTS,
  REFRESH_MATCHING_CONTEXTS_FAILED
);
