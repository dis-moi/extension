'use client';

import React, { useEffect, useRef } from 'react';
import { createBrowserHistory, createMemoryHistory, History } from 'history';
import { Provider } from 'react-redux';
import { Contributor } from '@dismoi/domain/contributor';
import { SupportedLanguage } from '@dismoi/i18n/language';
import { createProfilesStore, ProfilesStore } from 'app/profiles/store';
import isBrowser from 'libs/utils/isBrowser';
import { receivedContributors } from 'libs/store/actions';
import { fetchCategoriesSuccess } from 'libs/store/actions/categories';
import { Categories } from '@dismoi/domain/category';
import { ConnectedRouter } from 'libs/store/router';
import Background from 'app/profiles/App/Background';
import PageContainer from 'app/profiles/App/PageContainer';
import Pages from 'app/profiles/App/Pages';

export interface ProfilesAppProps {
  locale: SupportedLanguage;
  /** The requested path, known to the server and found again by the browser. */
  initialPath: string;
  contributors: Contributor[];
  categories: Categories;
}

const createHistory = (initialPath: string): History =>
  isBrowser()
    ? createBrowserHistory()
    : createMemoryHistory({ initialEntries: [initialPath] });

/**
 * The same tree renders on both sides. Three precautions let the browser find
 * exactly the HTML of the server:
 *
 * - the history is in memory on the server, where `window` does not exist;
 * - the contributors and the categories are poured into the store during the
 *   render, from the same data;
 * - the sagas only start after the hydration, because the first of them asks
 *   for the categories and would tip the collection into "loading" on one
 *   side only.
 */
const ProfilesApp = ({
  locale,
  initialPath,
  contributors,
  categories,
}: ProfilesAppProps) => {
  const profilesStore = useRef<ProfilesStore | null>(null);

  if (!profilesStore.current) {
    const created = createProfilesStore({
      history: createHistory(initialPath),
      locale,
    });

    created.store.dispatch(receivedContributors(contributors));
    created.store.dispatch(fetchCategoriesSuccess(categories));

    profilesStore.current = created;
  }

  const { store, history, runSagas } = profilesStore.current;

  useEffect(() => {
    const task = runSagas();

    return () => task.cancel();
  }, [runSagas]);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history as History}>
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
