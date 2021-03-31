import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import { path } from '../../../../routes';
import useChangeLanguage from '../../../hooks/useChangeLanguage';

const Pages = () => {
  const lang = useChangeLanguage();
  return (
    <>
      <Switch>
        <Redirect exact path="/" to={path.fr.CONTRIBUTORS} />
        <Redirect exact path="/en" to={path.en.CONTRIBUTORS} />
        <Route path={path[lang].CONTRIBUTORS} component={Profiles} />
        <Route path={path[lang].SUBSCRIPTIONS} component={Subscriptions} />
        <Route component={Error} />
      </Switch>
    </>
  );
};

export default Pages;
