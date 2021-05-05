import { put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { open, OpenFrom, showServiceMessage } from 'src/app/actions';
import { createErrorAction } from 'libs/store/actions/helpers';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import Tab from 'libs/lmem/tab';
import { getServiceMessageLastShowDate } from '../selectors/serviceMessage.selectors';
import { LinkType } from 'libs/lmem/ServiceMessage';
import { isWithinLastHours } from 'libs/utils/areWithinHours';
import { Level } from '../../../../../libs/utils/Logger';
import i18n from 'i18next';

export const buildMessages = (messages: string[], nbNotices = 0): string[] => {
  const firstMessage =
    nbNotices > 0
      ? 'Il existe une contribution sur cette page. Pour la visualiser, veuillez finaliser votre configuration.'
      : 'Pour poster et recevoir des messages, veuillez finaliser votre configuration.';

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
              label: 'Choisir mes sources',
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
