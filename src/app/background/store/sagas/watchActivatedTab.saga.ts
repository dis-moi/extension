import { call, put, take, select } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createActivatedTabListener from 'libs/webext/createActivatedTabListener';
import { tabActivated } from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { disable } from 'libs/webext/browserAction';
import { resetBadge } from 'libs/domain/badge';
import { isOptionsPage } from 'libs/webext/createMessageHandler';
import { Level } from 'libs/utils/Logger';
import { getTabById } from 'app/background/store/selectors/tabs';

export default function*() {
  const channel = yield call(() => eventChannel(createActivatedTabListener));

  while (true) {
    try {
      const tabId = yield take(channel);
      const tab = yield select(getTabById(tabId));
      if (tab && tab.url) {
        yield put(
          tabActivated({
            ...tab,
            options: isOptionsPage(tab.url)
          })
        );
      }

      if (!tab || !tab.url) {
        yield call(resetBadge, tabId);
        yield call(disable, tab);
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}
