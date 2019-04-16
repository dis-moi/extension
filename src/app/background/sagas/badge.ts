import { takeLatest } from 'redux-saga/effects';
import { NoticesUpdatedAction } from '../../actions/recommendations';
import { Theme } from '../../theme';

export const updateBadgeSaga = (theme: Theme) =>
  function*({
    payload: notices,
    meta: { tab: tabId }
  }: NoticesUpdatedAction): IterableIterator<any> {
    const unreadNotices = notices.filter(notice => !notice.read);
    const { backgroundColor } = theme.badge;

    chrome.browserAction.setBadgeText({
      text:
        unreadNotices.length > 0
          ? unreadNotices.length.toString()
          : notices.length.toString(),
      tabId
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color:
        unreadNotices.length > 0
          ? backgroundColor.unread
          : backgroundColor.read,
      tabId
    });
  };

export default (theme: Theme) =>
  function* tabRootSaga() {
    yield takeLatest('NOTICES_UPDATED', updateBadgeSaga(theme));
  };
