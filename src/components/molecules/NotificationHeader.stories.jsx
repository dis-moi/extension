import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NotificationHeader from './NotificationHeader';

storiesOf('molecules/NotificationHeader', module)
  .addDecorator(getStory => (
    <Router>
      {getStory()}
    </Router>
  ))
  .add('normal', () => (
    <NotificationHeader title="title" close={action('close')} onBack={action('onback')} />
  ));
