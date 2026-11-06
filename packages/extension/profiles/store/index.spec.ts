import { expect } from 'chai';
import { createProfilesStore } from './index';
import { ProfilesState } from './reducers';

/**
 * Le rendu serveur impose que le premier rendu du navigateur donne le même
 * HTML. Les sagas doivent donc rester à l'arrêt tant que la page n'est pas
 * hydratée : `categoriesSaga` demande les catégories dès son démarrage, et
 * la collection passerait « en cours de chargement » d'un côté seulement.
 */
describe('profiles > store', function () {
  it('se construit sans historique ni navigateur', () => {
    expect(() => createProfilesStore()).to.not.throw();
  });

  it('retient la langue qu’on lui donne, pour que l’ordre d’affichage ne dépende pas d’i18next', () => {
    const { store } = createProfilesStore({ locale: 'en' });

    expect((store.getState() as ProfilesState).locale).to.equal('en');
  });

  it('ne démarre aucune saga tant qu’on ne le demande pas', () => {
    const { store } = createProfilesStore();
    const { categories } = store.getState() as ProfilesState;

    expect(categories.fetching).to.equal(0);
    expect(categories.fetched).to.equal(false);
  });

  it('démarre les sagas à la demande', () => {
    const { store, runSagas } = createProfilesStore();

    const task = runSagas();

    const { categories } = store.getState() as ProfilesState;
    expect(categories.fetching).to.be.greaterThan(0);

    task.cancel();
  });

  it('rend une tâche annulable', () => {
    // La saga de connexion réessaie toutes les cinq secondes : sans
    // annulation, elle survit au démontage du composant — et retient ici le
    // processus de test.
    const { runSagas } = createProfilesStore();
    const task = runSagas();

    task.cancel();

    expect(task.isRunning()).to.equal(false);
  });
});
