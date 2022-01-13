import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useChangeLanguage from 'app/profiles/hooks/useChangeLanguage';
import ConnectedContextPopin from '../ContextPopin/';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import { getFacet } from '../../../../libs/facets/getFacet';

const Pages = () => {
  useChangeLanguage();
  const { t, i18n } = useTranslation();
  const prefix = getFacet() === 'lmel' ? '' : `/${i18n.language}`;

  return (
    <>
      <Switch>
        <Route
          path={`${prefix}${t('path.profiles.contributors')}`}
          component={Profiles}
        />
        <Route
          path={`${prefix}${t('path.profiles.subscriptions')}`}
          component={Subscriptions}
        />
        {getFacet() !== 'lmel' && (
          <Redirect
            exact
            from={`${t('path.profiles.contributors')}`}
            to={`/${i18n.language}${t('path.profiles.contributors')}`}
          />
        )}
        {getFacet() !== 'lmel' && (
          <Redirect
            exact
            from={`${t('path.profiles.subscriptions')}`}
            to={`/${i18n.language}${t('path.profiles.subscriptions')}`}
          />
        )}
        <Redirect
          exact
          from="/"
          to={`${prefix}${t('path.profiles.contributors')}`}
        />
        <Route render={() => <Error message="Introuvable" />} />
      </Switch>
      <ConnectedContextPopin />
    </>
  );
};

export default Pages;
