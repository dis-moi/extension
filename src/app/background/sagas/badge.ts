import { takeLatest } from 'redux-saga/effects';
import { NoticesUpdatedAction } from '../../actions/recommendations';
import { BadgeTheme, updateBadge, resetBadge } from '../../lmem/badge';
import { TabAction } from '../../actions';

export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*({
    payload: notices,
    meta: { tab: tabId }
  }: NoticesUpdatedAction): IterableIterator<any> {
    updateBadge(notices, badgeTheme, tabId);
  };

export function* resetBadgeSaga({
  meta: { tab: tabId }
}: TabAction): IterableIterator<any> {
  resetBadge(tabId);
}

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest('NOTICES_UPDATED', updateBadgeSaga(badgeTheme));
    yield takeLatest(
      ['BROWSER/TAB_CREATED', 'BROWSER/TAB_UPDATED'],
      resetBadgeSaga
    );
  };
