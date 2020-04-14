import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import ProfileList from './List';
import Profile from './Profile';

export interface ProfilesRouterProps extends RouteComponentProps {}

export default ({ match: { url }, location }: ProfilesRouterProps) => (
  <Switch location={location}>
    <Route path={url} exact component={ProfileList} />
    <Route path={`${url}/:id`} component={Profile} />
  </Switch>
);
