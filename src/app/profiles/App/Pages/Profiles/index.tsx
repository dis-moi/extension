import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import ProfileList from './List';
import Profile from './Profile';

export interface ProfilesRouterProps extends RouteComponentProps {}

export default ({ match: { url }, location }: ProfilesRouterProps) => (
  <ScrollToTop location={location}>
    <p>{location}</p>
  </ScrollToTop>
);
