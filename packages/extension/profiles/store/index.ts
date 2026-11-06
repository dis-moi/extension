import {
  Action,
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store,
  StoreEnhancer,
} from 'redux';
import { routerMiddleware } from 'libs/store/router';
import createSagaMiddleware, { Task } from '@redux-saga/core';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
import { History } from 'history';
import { SupportedLanguage } from '@dismoi/i18n/language';
import isBrowser from 'libs/utils/isBrowser';
import rootReducer, { ProfilesState } from './reducers';
import rootSaga from './sagas';

export interface ProfilesStore {
  store: Store<ProfilesState>;
  /** L'historique du store, que le routeur doit partager. */
  history?: History;
  /**
   * Démarre les sagas et rend la tâche obtenue, pour pouvoir l'annuler.
   *
   * À appeler depuis un effet, jamais pendant le rendu : la première d'entre
   * elles demande les catégories dès son lancement, et le rendu du serveur
   * ne verrait pas ce chargement que le navigateur, lui, aurait déjà
   * commencé. L'annulation compte autant : la saga de connexion réessaie
   * indéfiniment, et rien ne l'arrêterait au démontage.
   */
  runSagas: () => Task;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const reduxDevTools = (): StoreEnhancer => {
  const extension = isBrowser()
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
    : undefined;

  return extension ? extension() : (next: any) => next;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const logger = () =>
  createLogger({
    level: 'info',
    collapsed: true,
    titleFormatter: (action: Action, time: string, took: number): string =>
      `[PROFILES] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`,
  });

export interface ProfilesStoreOptions {
  /** Absent côté serveur, où la navigation n'a pas lieu. */
  history?: History;
  /** La langue du chemin, qui décide de l'ordre d'affichage. */
  locale?: SupportedLanguage;
}

export const createProfilesStore = ({
  history,
  locale,
}: ProfilesStoreOptions = {}): ProfilesStore => {
  const sagaMiddleware = createSagaMiddleware();

  // Le journal et le contrôle d'immuabilité s'adressent à quelqu'un qui
  // regarde une console de navigateur pendant qu'il développe : sur le
  // serveur ils ne feraient que remplir les traces du rendu, et en
  // production ils coûtent à chaque action sans que personne ne les lise.
  const whileDeveloping = isBrowser() && process.env.NODE_ENV !== 'production';

  const middlewares = [
    history && routerMiddleware(history),
    sagaMiddleware,
    whileDeveloping && logger(),
    whileDeveloping && immutableStateInvariant(),
  ].filter(Boolean) as Middleware[];

  const store = createStore(
    rootReducer(history),
    locale ? ({ locale } as Partial<ProfilesState>) : undefined,
    compose(applyMiddleware(...middlewares), reduxDevTools()),
  );

  return {
    store,
    history,
    runSagas: () => sagaMiddleware.run(rootSaga),
  };
};
