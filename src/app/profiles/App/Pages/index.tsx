import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useChangeLanguage from '../../../hooks/useChangeLanguage';
import ConnectedContextPopin from '../ContextPopin/';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';

const Pages = () => {
  useChangeLanguage();
  const { t } = useTranslation();
  return (
    <>
      <Switch>
        <Redirect exact path="/" to={t('path.profiles.contributors')} />
        <Redirect exact path="/en" to={t('path.profiles.contributors')} />
        <Route path={t('path.profiles.contributors')} component={Profiles} />
        <Route
          path={t('path.profiles.subscriptions')}
          component={Subscriptions}
        />
        <Route component={Error} />
      </Switch>
      <ConnectedContextPopin />
    </>
  );
};

export default Pages;
