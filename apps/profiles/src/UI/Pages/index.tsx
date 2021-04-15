import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import useChangeLanguage from '../../../../../src/app/hooks/useChangeLanguage';
import { useTranslation } from 'react-i18next';

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
    </>
  );
};

export default Pages;
