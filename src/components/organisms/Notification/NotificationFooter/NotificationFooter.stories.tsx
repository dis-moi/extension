import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import NotificationFooter from './NotificationFooter';

export default {
  title: 'Components/Molecules/NotificationFooter'
};

export const OnNothing = () => (
  <Router>
    <NotificationFooter />
  </Router>
);

OnNothing.story = {
  name: 'On nothing'
};

export const OnNotice = () => (
  <Router location="/notices">
    <NotificationFooter />
  </Router>
);

OnNotice.story = {
  name: 'On notice'
};

export const OnSubscriptions = () => (
  <Router location="/subscriptions">
    <NotificationFooter />
  </Router>
);

OnSubscriptions.story = {
  name: 'On subscriptions'
};
