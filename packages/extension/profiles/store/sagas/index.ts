import { all, fork } from 'redux-saga/effects';
import Logger from 'libs/utils/Logger';
import { canConnectToExtension } from 'libs/webext/webExtensionApi';
import contributorsSaga from 'app/profiles/store/sagas/contributors.saga';
import noticesSaga from 'app/profiles/store/sagas/notices.saga';
import portConnectionSaga from 'app/profiles/store/sagas/portConnection.saga';
import windowConnectionSaga from 'app/profiles/store/sagas/windowConnection.saga';
import subscriptionsSaga from 'app/profiles/store/sagas/subscriptions.saga';
import categoriesSaga from 'app/profiles/store/sagas/categories.saga';
import locationChangeSaga from './locationChange.saga';
import contributorSaga from './contributor.saga';

/**
 * Le choix du canal se fait au démarrage des sagas, pas au chargement du
 * module : évalué à l'import, il lisait la variable globale `browser` dans
 * une page qui ne la déclare pas — une `ReferenceError` avant même le premier
 * rendu, et la page des profils restait vide.
 */
const connectionSaga = () => {
  const portAvailable = canConnectToExtension();

  Logger.info(
    portAvailable
      ? `Port available, using portConnectionSaga`
      : `Port not available, using windowConnectionSaga`,
  );

  return portAvailable
    ? portConnectionSaga
    : windowConnectionSaga.bind(null, process.env.PROFILES_ORIGIN);
};

export default function* rootSaga() {
  yield all([
    fork(connectionSaga()),
    fork(contributorSaga),
    fork(contributorsSaga),
    fork(locationChangeSaga),
    fork(noticesSaga),
    fork(subscriptionsSaga),
    fork(categoriesSaga),
  ]);
}
