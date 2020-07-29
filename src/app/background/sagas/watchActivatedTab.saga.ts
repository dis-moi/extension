import { call, put, take, select } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createActivatedTabListener from 'webext/createActivatedTabListener';
import { tabActivated } from 'app/actions';
import { createErrorAction } from 'app/actions/helpers';
import { getTabById } from '../selectors/tabs';
import { disable } from 'webext/browserAction';
import { resetBadge } from 'app/lmem/badge';
import { Level } from '../../utils/Logger';
import { isOptionsPage } from 'webext/createMessageHandler';

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
        yield call(disable, tabId);
      }
    } catch (e) {
      yield put(createErrorAction()(e, { severity: Level.ERROR }));
    }
  }
}
