import { takeLatest, call, select } from 'redux-saga/effects';
import { NoticesUpdatedAction } from '../../actions/notices';
import { BadgeTheme, updateBadge, resetBadge } from '../../lmem/badge';
import { TabAction } from '../../actions';
import { getNoticesToDisplay } from '../selectors/prefs';
import { badgeResetFailed, badgeUpdateFailed } from '../../actions/badge';

export const updateBadgeSaga = (badgeTheme: BadgeTheme) =>
  function*({
    payload: notices,
    meta: { tab: tabId }
  }: NoticesUpdatedAction): IterableIterator<any> {
    try {
      const noticesToDisplay = yield select(getNoticesToDisplay(notices));
      yield call(updateBadge, noticesToDisplay, badgeTheme, tabId);
    } catch (e) {
      badgeUpdateFailed(e);
    }
  };

export function* resetBadgeSaga({
  meta: { tab: tabId }
}: TabAction): IterableIterator<any> {
  try {
    resetBadge(tabId);
  } catch (e) {
    badgeResetFailed(e);
  }
}

export default (badgeTheme: BadgeTheme) =>
  function* tabRootSaga() {
    yield takeLatest('NOTICES_UPDATED', updateBadgeSaga(badgeTheme));
    yield takeLatest(
      ['BROWSER/TAB_CREATED', 'BROWSER/TAB_UPDATED'],
      resetBadgeSaga
    );
  };
