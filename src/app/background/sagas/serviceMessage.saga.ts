import { put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { showServiceMessage } from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';
import Tab from 'app/lmem/tab';

export const buildMessages = (messages: string[], nbNotices = 0): string[] => {
  const firstMessage =
    nbNotices > 0
      ? 'Il existe une bulle sur cette page. Pour la visualiser, veuillez finaliser votre configuration.'
      : 'Pour poster et recevoir des messages, veuillez finaliser votre configuration.';

  return R.prepend(firstMessage, messages);
};

export default function* serviceMessageSaga(tab: Tab, nbNotices = 0) {
  const tosAccepted = yield select(areTosAccepted);
  const nbSubscriptions = yield select(getNbSubscriptions);

  if (!tosAccepted) {
    yield put(
      showServiceMessage(buildMessages([], nbNotices), tab, {
        label: 'Lire et accepter les CGU',
        url: '/onboarding'
      })
    );
  } else if (tosAccepted && nbSubscriptions === 0) {
    yield put(
      showServiceMessage(buildMessages([], nbNotices), tab, {
        label: 'Choisir mes contributeurs',
        url: '/settings/suggestions'
      })
    );
  }
}
