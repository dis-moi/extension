import { ProfilesState } from 'app/profiles/store/reducers';
import { createSelector } from 'reselect';
import { isCollectionLoading } from 'app/store/collection/selectors';
import { NoticeItem } from 'app/lmem/notice';

export const getNoticesCollection = (state: ProfilesState) => state.notices;

export const areNoticesLoading = createSelector(
  [getNoticesCollection],
  noticesCollection => isCollectionLoading<NoticeItem>(noticesCollection)
);
export const getNotices = createSelector(
  [getNoticesCollection],
  noticesCollection => noticesCollection.items
);
