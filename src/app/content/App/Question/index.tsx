import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import FormScreen from './FormScreen';
import PreviewScreen from './PreviewScreen';
import ConfirmationScreen from './ConfirmationScreen';

export default ({ match }: RouteComponentProps) => (
  <Switch>
    <Route path={match.url} exact component={FormScreen} />
    <Route path={`${match.url}/preview`} component={PreviewScreen} />
    <Route path={`${match.url}/confirmation`} component={ConfirmationScreen} />
  </Switch>
);
