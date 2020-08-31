import createCollectionReducer, {
  CollectionState
} from 'app/store/collection/reducers';
import {
  FETCH_NOTICES_FAILURE,
  FETCH_NOTICES_REQUEST,
  NOTICES_FETCHED
} from 'app/actions';
import { NoticeItem } from 'app/lmem/notice';

export type NoticesCollectionState = CollectionState<NoticeItem>;

export default createCollectionReducer<NoticeItem>(
  FETCH_NOTICES_REQUEST,
  NOTICES_FETCHED,
  FETCH_NOTICES_FAILURE,
  'id',
  { withOffset: true, indexedOffset: true }
);
