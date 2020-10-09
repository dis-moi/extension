import { Redirect, Route, Switch } from 'react-router';
import React from 'react';
import Tabs from 'components/molecules/Tabs/Tabs';
import Tab from 'components/atoms/Tab/Tab';
import Profiles from './Profiles';
import Error from './Error';
import Subscriptions from './Subscriptions';
import withConnect from './withConnect';

export interface PagesProps {
  connected?: boolean;
}

const Pages = ({ connected }: PagesProps) => (
  <>
    {connected && (
      <Tabs>
        <Tab to={'/sources'}>Informateurs</Tab>
        <Tab to={'/mes-abonnements'}>Abonnements</Tab>
      </Tabs>
    )}
    <Switch>
      <Redirect exact path="/" to="/sources" />
      <Route path="/sources" component={Profiles} />
      <Route path="/mes-abonnements" component={Subscriptions} />
      <Route component={Error} />
    </Switch>
  </>
);

export default withConnect(Pages);
