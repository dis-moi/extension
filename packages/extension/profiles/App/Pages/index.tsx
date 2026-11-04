import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useChangeLanguage from 'app/profiles/hooks/useChangeLanguage';
import ConnectedContextPopin from '../ContextPopin/';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';

const Pages = () => {
  useChangeLanguage();
  const { t } = useTranslation();

  // Les chemins traduits portent déjà la langue (« /fr/profils »,
  // « /en/guides ») et sont ceux que sert le site. Y ajouter un préfixe
  // donnait « /fr/fr/profils », que Next ne connaît pas.
  return (
    <>
      <Switch>
        <Route path={t('path.profiles.contributors')} component={Profiles} />
        <Route
          path={t('path.profiles.subscriptions')}
          component={Subscriptions}
        />
        <Redirect exact from="/" to={t('path.profiles.contributors')} />
        <Route render={() => <Error message="Introuvable" />} />
      </Switch>
      <ConnectedContextPopin />
    </>
  );
};

export default Pages;
