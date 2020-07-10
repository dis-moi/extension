import React from 'react';
import { RouteComponentProps } from 'react-router';
import ScrollToTop from 'components/ScrollToTop';
import Subscriptions from './Subscriptions';

export default ({ location }: RouteComponentProps) => (
  <ScrollToTop location={location}>
    <Subscriptions />
  </ScrollToTop>
);
