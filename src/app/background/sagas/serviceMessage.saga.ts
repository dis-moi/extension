import { put, select } from 'redux-saga/effects';
import { showServiceMessage, TabAction } from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';

export default function* serviceMessageSaga(tabAction: TabAction) {
  const tosAccepted = yield select(areTosAccepted);
  const nbSubscriptions = yield select(getNbSubscriptions);

  if (!tosAccepted || nbSubscriptions === 0) {
    const message = !tosAccepted
      ? "Pour voir des bulles ou en créer, merci d'accepter les Conditions Générales d'Utilisation."
      : 'Abonnez vous à des contributeurs pour recevoir leurs messages.';
    const action = !tosAccepted
      ? {
          label: 'Lire et accepter les CGU',
          url: '/onboarding'
        }
      : {
          label: "M'abonner",
          url: '/onboarding/subscribe'
        };
    yield put(showServiceMessage(message, tabAction.meta.tab, action));
  }
}
