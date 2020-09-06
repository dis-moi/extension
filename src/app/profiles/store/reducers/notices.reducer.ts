import createCollectionReducer, {
  CollectionState
} from 'app/store/collection/reducers';
import {
  FETCH_NOTICES_FAILURE,
  FETCH_NOTICES_REQUEST,
  NOTICES_FETCHED
} from 'app/actions';
import { Notice } from 'app/lmem/notice';

export type NoticesCollectionState = CollectionState<Notice>;

export default createCollectionReducer<Notice>(
  FETCH_NOTICES_REQUEST,
  NOTICES_FETCHED,
  FETCH_NOTICES_FAILURE,
  'id',
  { withOffset: true, indexedOffset: true }
);
