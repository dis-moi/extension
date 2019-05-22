import { takeLatest, call, select } from 'redux-saga/effects';
import { NoticesUpdatedAction } from '../../actions/notices';
import { BadgeTheme, updateBadge, resetBadge } from '../../lmem/badge';
import { TabAction } from '../../actions';
import { getNoticesToDisplay } from '../selectors/prefs';

export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*({
    payload: notices,
    meta: { tab: tabId }
  }: NoticesUpdatedAction): IterableIterator<any> {
    const noticesToDisplay = yield select(getNoticesToDisplay(notices));
    yield call(updateBadge, noticesToDisplay, badgeTheme, tabId);
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
