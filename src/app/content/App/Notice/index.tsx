import React from 'react';
import { Route, Redirect, RouteComponentProps, Switch } from 'react-router-dom';
import List from './List';
import Details from './Details';
import Update from './Update';

interface NoticeProps extends RouteComponentProps {
  cguAccepted: boolean;
}

export default ({ match, location, cguAccepted }: NoticeProps) => (
  <Switch location={location}>
    <Route
      path={match.url}
      exact
      render={props =>
        cguAccepted ? (
          <List {...props} />
        ) : (
          <Redirect to={`${match.url}/update`} />
        )
      }
    />
    <Route path={`${match.url}/details/:id`} component={Details} />
    <Route path={`${match.url}/update`} component={Update} />
  </Switch>
);
