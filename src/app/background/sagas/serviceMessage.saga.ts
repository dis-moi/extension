import { put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import i18n from 'i18next';
import { open, OpenFrom, showServiceMessage } from 'libs/store/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import Tab from 'app/lmem/tab';
import { LinkType } from 'app/lmem/ServiceMessage';
import { isWithinLastHours } from 'libs/utils/areWithinHours';
import { Level } from 'libs/utils/Logger';
import { getServiceMessageLastShowDate } from '../selectors/serviceMessage.selectors';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import { areTosAccepted } from '../selectors/prefs';

export const buildMessages = (messages: string[], nbNotices = 0): string[] => {
  const firstMessage =
    nbNotices > 0
      ? i18n.t('services.first_message_exist')
      : i18n.t('services.first_message_none');

  return R.prepend(firstMessage, messages);
};

export default function* serviceMessageSaga(tab: Tab, nbNotices = 0) {
  try {
    const tosAccepted = yield select(areTosAccepted);
    const nbSubscriptions = yield select(getNbSubscriptions);
    const lastShownDate = yield select(getServiceMessageLastShowDate);

    if (tosAccepted && nbSubscriptions === 0) {
      yield put(
        showServiceMessage(
          {
            messages: buildMessages([], nbNotices),
            action: {
              label: i18n.t('services.label'),
              url: i18n.t('path.profiles.contributors'),
              type: LinkType.Options
            }
          },
          tab
        )
      );
    }

    if (!isWithinLastHours(lastShownDate, 4) && nbNotices > 0) {
      yield put(open(OpenFrom.ServiceMessage, tab));
    }
  } catch (e) {
    yield put(createErrorAction()(e, { severity: Level.ERROR }));
  }
}
