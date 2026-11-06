'use client';

import React, { useEffect, useRef } from 'react';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { Provider } from 'react-redux';
import { Contributor } from '@dismoi/domain/contributor';
import { SupportedLanguage } from '@dismoi/i18n/language';
import { createProfilesStore, ProfilesStore } from 'app/profiles/store';
import { receivedContributors } from 'libs/store/actions';
import { fetchCategoriesSuccess } from 'libs/store/actions/categories';
import { Categories } from '@dismoi/domain/category';
import { ConnectedRouter } from 'libs/store/router';
import Background from 'app/profiles/App/Background';
import PageContainer from 'app/profiles/App/PageContainer';
import Pages from 'app/profiles/App/Pages';

export interface ProfilesAppProps {
  locale: SupportedLanguage;
  /** Le chemin demandé, que le serveur connaît et que le navigateur retrouve. */
  initialPath: string;
  contributors: Contributor[];
  categories: Categories;
}

const isBrowser = (): boolean => typeof window !== 'undefined';

const createHistory = (initialPath: string): History =>
  isBrowser()
    ? createBrowserHistory()
    : createMemoryHistory({ initialEntries: [initialPath] });

/**
 * Le même arbre se rend des deux côtés. Pour que le navigateur retrouve
 * exactement le HTML du serveur, trois précautions :
 *
 * - l'historique est en mémoire sur le serveur, où `window` n'existe pas ;
 * - les contributeurs et les catégories sont versés dans le store pendant le
 *   rendu, à partir des mêmes données ;
 * - les sagas ne démarrent qu'après l'hydratation, car la première d'entre
 *   elles demande les catégories et ferait basculer la collection en
 *   « chargement » d'un côté seulement.
 */
const ProfilesApp = ({
  locale,
  initialPath,
  contributors,
  categories,
}: ProfilesAppProps) => {
  const profilesStore = useRef<ProfilesStore | null>(null);
  const history = useRef<History | null>(null);

  if (!profilesStore.current) {
    history.current = createHistory(initialPath);

    const created = createProfilesStore({
      history: history.current,
      locale,
    });

    created.store.dispatch(receivedContributors(contributors));
    created.store.dispatch(fetchCategoriesSuccess(categories));

    profilesStore.current = created;
  }

  const { store, runSagas } = profilesStore.current;

  useEffect(() => {
    const task = runSagas();

    return () => task.cancel();
  }, [runSagas]);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history.current as History}>
        <Background>
          <PageContainer>
            <Pages />
          </PageContainer>
        </Background>
      </ConnectedRouter>
    </Provider>
  );
};

export default ProfilesApp;
