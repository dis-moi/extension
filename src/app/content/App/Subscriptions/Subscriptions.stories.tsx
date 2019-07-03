import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { Subscriptions } from '.';
import { action } from '@storybook/addon-actions';

storiesOf('screens/Subscriptions', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
    <Subscriptions settingsRequested={action('settingsRequested')} />
  ));
