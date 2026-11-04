import { expect } from 'chai';
import { takeEvery } from 'redux-saga/effects';
import { SUBSCRIBE } from 'libs/store/actions';
import refreshMatchingContextsRootSaga, {
  fetchNewlySubscribedMatchingContexts,
} from './refreshMatchingContexts';

describe('refreshMatchingContextsRootSaga', () => {
  it('watches new subscriptions before starting the periodic refresh', () => {
    // La boucle de rafraîchissement périodique attend l'alarme indéfiniment.
    // Tout effet bloquant placé avant ce watcher empêche son enregistrement :
    // une extension fraîchement installée s'abonne à ses contributeurs
    // présélectionnés sans jamais récupérer leurs contextes de ciblage, et
    // n'affiche donc aucune notice avant la première alarme
    // (REFRESH_MC_INTERVAL, soit 30 minutes en production).
    expect(refreshMatchingContextsRootSaga().next().value).to.deep.equal(
      takeEvery(SUBSCRIBE, fetchNewlySubscribedMatchingContexts),
    );
  });
});
