import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Examples from './Examples';
import ScrollToTop from 'components/ScrollToTop';
import closeCurrentTab from 'webext/closeCurrentTab';

export default ({ match, location }: RouteComponentProps) => (
  <ScrollToTop location={location}>
    <Switch>
      <Route
        path={match.url}
        component={() => <Examples next={closeCurrentTab} />}
      />
    </Switch>
  </ScrollToTop>
);
