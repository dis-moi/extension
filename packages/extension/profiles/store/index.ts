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
import rootReducer, { ProfilesState } from './reducers';
import rootSaga from './sagas';

export interface ProfilesStore {
  store: Store<ProfilesState>;
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

const isBrowser = (): boolean => typeof window !== 'undefined';

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
  // regarde une console de navigateur ; sur le serveur ils ne feraient que
  // remplir les traces du rendu.
  const middlewares = [
    history && routerMiddleware(history),
    sagaMiddleware,
    isBrowser() && logger(),
    isBrowser() && process.env.NODE_ENV !== 'production'
      ? immutableStateInvariant()
      : null,
  ].filter(Boolean) as Middleware[];

  const store = createStore(
    rootReducer(history),
    locale ? ({ locale } as Partial<ProfilesState>) : undefined,
    compose(applyMiddleware(...middlewares), reduxDevTools()),
  );

  return {
    store,
    runSagas: () => sagaMiddleware.run(rootSaga),
  };
};
