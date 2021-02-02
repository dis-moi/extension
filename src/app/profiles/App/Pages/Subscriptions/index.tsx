import React from 'react';
import { RouteComponentProps } from 'react-router';
import ScrollToTop from 'components/ScrollToTop';
import Subscriptions from './Subscriptions';
import withConnect from './withConnect';

export const ConnectedSubscriptions = withConnect(Subscriptions);

export interface RoutedConnectedSubscriptionsProps
  extends RouteComponentProps {}

export default ({ location }: RoutedConnectedSubscriptionsProps) => (
  <ScrollToTop location={location}>
    <ConnectedSubscriptions />
  </ScrollToTop>
);
