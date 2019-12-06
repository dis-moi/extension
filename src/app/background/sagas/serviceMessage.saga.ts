import { put, select } from 'redux-saga/effects';
import { showServiceMessage, TabAction } from 'app/actions';
import { areTosAccepted } from '../selectors/prefs';
import { getNbSubscriptions } from '../selectors/subscriptions.selectors';

export default function* serviceMessageSaga(tabAction: TabAction) {
  const tosAccepted = yield select(areTosAccepted);
  const nbSubscriptions = yield select(getNbSubscriptions);

  if (!tosAccepted) {
    yield put(
      showServiceMessage(
        "Pour voir des bulles ou en créer, merci d'accepter les Conditions Générales d'Utilisation.",
        tabAction.meta.tab,
        { label: 'Lire et accepter les CGU', url: '/onboarding' }
      )
    );
  } else if (tosAccepted && nbSubscriptions === 0) {
    yield put(
      showServiceMessage(
        'Abonnez vous à des contributeurs pour recevoir leurs messages.',
        tabAction.meta.tab,
        { label: "M'abonner", url: '/onboarding/subscribe' }
      )
    );
  }
}
