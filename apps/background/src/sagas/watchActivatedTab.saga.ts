import { call, put, take, select } from '@redux-saga/core/effects';
import { eventChannel } from '@redux-saga/core';
import createActivatedTabListener from 'libs/webext/createActivatedTabListener';
import { tabActivated } from 'src/app/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { getTabById } from '../selectors/tabs';
import { disable } from 'libs/webext/browserAction';
import { resetBadge } from 'libs/lmem/badge';
import { Level } from '../../../../libs/utils/Logger';
import { isOptionsPage } from 'libs/webext/createMessageHandler';

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
