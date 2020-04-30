import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import NotificationFooter from './NotificationFooter';

storiesOf('Components/Molecules/NotificationFooter', module)
  .add('On nothing', () => (
    <Router>
      <NotificationFooter />
    </Router>
  ))
  .add('On notice', () => (
    <Router location="/notices">
      <NotificationFooter />
    </Router>
  ))
  .add('On subscriptions', () => (
    <Router location="/subscriptions">
      <NotificationFooter />
    </Router>
  ));
