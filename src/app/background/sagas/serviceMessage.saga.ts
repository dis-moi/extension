import { put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import {
  createErrorAction,
  open,
  OpenFrom,
  showServiceMessage
} from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import Tab from 'app/lmem/tab';
import { getServiceMessageLastShowDate } from '../selectors/serviceMessage.selectors';
import { isToday } from 'date-fns';

export const buildMessages = (messages: string[], nbNotices = 0): string[] => {
  const firstMessage =
    nbNotices > 0
      ? 'Il existe une bulle sur cette page. Pour la visualiser, veuillez finaliser votre configuration.'
      : 'Pour poster et recevoir des messages, veuillez finaliser votre configuration.';

  return R.prepend(firstMessage, messages);
};

export default function* serviceMessageSaga(tab: Tab, nbNotices = 0) {
  try {
    const tosAccepted = yield select(areTosAccepted);
    const nbSubscriptions = yield select(getNbSubscriptions);
    const lastShownDate = yield select(getServiceMessageLastShowDate);

    if (!tosAccepted) {
      yield put(
        showServiceMessage(
          {
            messages: buildMessages([], nbNotices),
            action: {
              label: 'Lire et accepter les CGU',
              url: '/onboarding'
            },
            lastShownDate: null
          },
          tab
        )
      );
    } else if (tosAccepted && nbSubscriptions === 0) {
      yield put(
        showServiceMessage(
          {
            messages: buildMessages([], nbNotices),
            action: {
              label: 'Choisir mes contributeurs',
              url: '/settings/suggestions'
            },
            lastShownDate: null
          },
          tab
        )
      );
    }

    if (!isToday(lastShownDate)) {
      yield put(open(OpenFrom.ServiceMessage, tab));
    }
  } catch (e) {
    yield put(createErrorAction()(e));
  }
}
