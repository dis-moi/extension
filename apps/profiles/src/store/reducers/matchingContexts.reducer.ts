import createCollectionReducer, {
  CollectionState
} from 'src/app/store/collection/reducers';
import {
  REFRESH_MATCHING_CONTEXTS,
  REFRESH_MATCHING_CONTEXTS_FAILED,
  UPDATE_MATCHING_CONTEXTS
} from 'src/app/actions';
import { MatchingContext } from 'libs/lmem/matchingContext';

export type MatchingContextsCollectionState = CollectionState<MatchingContext>;

export default createCollectionReducer<MatchingContext>(
  REFRESH_MATCHING_CONTEXTS,
  UPDATE_MATCHING_CONTEXTS,
  REFRESH_MATCHING_CONTEXTS_FAILED
);
